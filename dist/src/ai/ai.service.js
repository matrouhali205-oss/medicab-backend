"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let AiService = class AiService {
    openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
    tasks = new Map();
    async startExtraction(transcript) {
        const taskId = (0, crypto_1.randomUUID)();
        this.tasks.set(taskId, { status: 'processing' });
        this.processAi(taskId, transcript).catch(err => {
            console.error("Background AI Error:", err);
            this.tasks.set(taskId, { status: 'error', error: err.message });
        });
        return { taskId };
    }
    getExtractionStatus(taskId) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new common_1.HttpException('Task not found or expired', common_1.HttpStatus.NOT_FOUND);
        }
        return task;
    }
    async processAi(taskId, transcript) {
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
        }
        catch (err) {
            console.error("Extraction Logic Error:", err);
            this.tasks.set(taskId, { status: 'error', error: err.message || 'AI Cloud Processing Error' });
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map