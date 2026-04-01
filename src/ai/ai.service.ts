import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AiService {
  private openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  // In-memory store for active extraction jobs
  private tasks = new Map<string, { status: 'processing' | 'done' | 'error', result?: any, error?: string }>();

  async startExtraction(transcript: string): Promise<{ taskId: string }> {
    const taskId = randomUUID();
    this.tasks.set(taskId, { status: 'processing' });
    
    // Background execution
    this.processAi(taskId, transcript).catch(err => {
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

  private async processAi(taskId: string, transcript: string) {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY || "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";
      
      const prompt = `You are a strict clinical AI assistant processing dictated voice notes. Analyze this transcript and return ONLY raw JSON. Do not include markdown formatting or conversational text.
Ensure the JSON has exactly these 4 keys:
"symptoms": (array of strings, concisely listing reported symptoms),
"painLevel": (string, concisely summarizing reported pain),
"duration": (string, concisely summarizing when it started),
"context": (string, a brief professional summary report)

Transcript to analyze: "${transcript}"`;

      const response = await fetch(this.openRouterUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "qwen/qwen-2.5-72b-instruct",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter API failed: ${errText}`);
      }

      const resData = await response.json();
      const content = resData.choices[0].message.content;
      const parsedJSON = JSON.parse(content);
      
      this.tasks.set(taskId, { status: 'done', result: parsedJSON });

    } catch (err: any) {
      console.error("Extraction Logic Error:", err);
      this.tasks.set(taskId, { status: 'error', error: err.message || 'AI Cloud Processing Error' });
    }
  }
}
