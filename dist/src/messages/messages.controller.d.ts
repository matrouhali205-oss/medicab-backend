import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(req: any, data: any): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isUrgent: boolean;
        isRead: boolean;
        senderId: string;
        receiverId: string;
    }>;
    getConversation(req: any, otherUserId: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isUrgent: boolean;
        isRead: boolean;
        senderId: string;
        receiverId: string;
    }[]>;
}
