import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AiService {
  private ollamaUrl = 'http://127.0.0.1:11434';
  
  // In-memory store for active extraction jobs to prevent Cloud API Timeouts
  private tasks = new Map<string, { status: 'processing' | 'done' | 'error', result?: any, error?: string }>();

  async startExtraction(transcript: string): Promise<{ taskId: string }> {
    const taskId = randomUUID();
    this.tasks.set(taskId, { status: 'processing' });
    
    // Fire and forget (runs asynchronously in the Node Event Loop background)
    this.processOllama(taskId, transcript).catch(err => {
      console.error("Background AI Error:", err);
      this.tasks.set(taskId, { status: 'error', error: err.message });
    });

    return { taskId };
  }

  getExtractionStatus(taskId: string) {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new HttpException('Task not found or expired', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  private async processOllama(taskId: string, transcript: string) {
    try {
      // 1. Determine local default model
      let modelName = 'llama3';
      try {
        const tagsRes = await fetch(`${this.ollamaUrl}/api/tags`);
        if (!tagsRes.ok) throw new Error('Ollama connection failed');
        const tagsData = await tagsRes.json();
        if (tagsData.models && tagsData.models.length > 0) {
          modelName = tagsData.models[0].name; 
        } else {
          throw new Error('No AI models downloaded in Ollama. Please run "ollama run llama3"');
        }
      } catch (e) {
        throw new Error('Ollama is not running locally. Please open the Ollama application on your Mac.');
      }

      // 2. Generate Structured Data
      const prompt = `You are a strict clinical AI assistant processing dictated voice notes. Analyze this transcript and return ONLY raw JSON. Do not include markdown formatting or conversational text.
Ensure the JSON has exactly these 4 keys:
"symptoms": (array of strings, concisely listing reported symptoms),
"painLevel": (string, concisely summarizing reported pain),
"duration": (string, concisely summarizing when it started),
"context": (string, a brief professional summary report)

Transcript to analyze: "${transcript}"`;

      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          prompt,
          stream: false,
          format: 'json'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate from Ollama: ${response.statusText}`);
      }

      const resData = await response.json();
      const parsedJSON = JSON.parse(resData.response); // Parse string to JS Object
      
      this.tasks.set(taskId, { status: 'done', result: parsedJSON });

    } catch (err: any) {
      this.tasks.set(taskId, { status: 'error', error: err.message || 'Ollama Network Crash' });
    }
  }
}
