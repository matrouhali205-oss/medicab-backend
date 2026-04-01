import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    getConversation(userId1: string, userId2: string): Promise<any>;
}
