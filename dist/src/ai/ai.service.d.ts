export declare class AiService {
    private openRouterUrl;
    private tasks;
    startExtraction(transcript: string): Promise<{
        taskId: string;
    }>;
    getExtractionStatus(taskId: string): {
        status: "processing" | "done" | "error";
        result?: any;
        error?: string;
    };
    private processAi;
}
