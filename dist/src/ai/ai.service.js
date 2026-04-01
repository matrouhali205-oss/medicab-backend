var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';
let AiService = class AiService {
    ollamaUrl = 'http://127.0.0.1:11434';
    tasks = new Map();
    async startExtraction(transcript) {
        const taskId = randomUUID();
        this.tasks.set(taskId, { status: 'processing' });
        this.processOllama(taskId, transcript).catch(err => {
            console.error("Background AI Error:", err);
            this.tasks.set(taskId, { status: 'error', error: err.message });
        });
        return { taskId };
    }
    getExtractionStatus(taskId) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new HttpException('Task not found or expired', HttpStatus.NOT_FOUND);
        }
        return task;
    }
    async processOllama(taskId, transcript) {
        try {
            let modelName = 'llama3';
            try {
                const tagsRes = await fetch(`${this.ollamaUrl}/api/tags`);
                if (!tagsRes.ok)
                    throw new Error('Ollama connection failed');
                const tagsData = await tagsRes.json();
                if (tagsData.models && tagsData.models.length > 0) {
                    modelName = tagsData.models[0].name;
                }
                else {
                    throw new Error('No AI models downloaded in Ollama. Please run "ollama run llama3"');
                }
            }
            catch (e) {
                throw new Error('Ollama is not running locally. Please open the Ollama application on your Mac.');
            }
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
            const parsedJSON = JSON.parse(resData.response);
            this.tasks.set(taskId, { status: 'done', result: parsedJSON });
        }
        catch (err) {
            this.tasks.set(taskId, { status: 'error', error: err.message || 'Ollama Network Crash' });
        }
    }
};
AiService = __decorate([
    Injectable()
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map