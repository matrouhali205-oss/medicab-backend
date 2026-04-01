import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(req: any, data: any): any;
    getConversation(req: any, otherUserId: string): any;
}
