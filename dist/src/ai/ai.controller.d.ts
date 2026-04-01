import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    extractNotes(body: {
        transcript: string;
    }): Promise<{
        taskId: string;
    } | {
        error: string;
    }>;
    getExtractionStatus(taskId: string): Promise<{
        status: "processing" | "done" | "error";
        result?: any;
        error?: string;
    }>;
}
