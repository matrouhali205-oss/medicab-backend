import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    // Automatically set the senderId from decoded JWT token
    data.senderId = req.user.id;
    return this.messagesService.create(data);
  }

  @Get('conversation/:otherUserId')
  getConversation(@Request() req: any, @Param('otherUserId') otherUserId: string) {
    return this.messagesService.getConversation(req.user.id, otherUserId);
  }
}
