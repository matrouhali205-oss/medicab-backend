import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isUrgent: boolean;
        isRead: boolean;
        senderId: string;
        receiverId: string;
    }>;
    getConversation(userId1: string, userId2: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        isUrgent: boolean;
        isRead: boolean;
        senderId: string;
        receiverId: string;
    }[]>;
}
