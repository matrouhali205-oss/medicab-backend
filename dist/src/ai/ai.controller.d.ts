import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    extractNotes(body: {
        transcript: string;
    }): Promise<any>;
    getExtractionStatus(taskId: string): Promise<any>;
}
