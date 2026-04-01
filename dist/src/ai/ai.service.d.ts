export declare class AiService {
    private openRouterUrl;
    extractNotes(transcript: string): Promise<{
        status: string;
        result: any;
    }>;
}
