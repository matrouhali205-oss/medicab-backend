import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('ai')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('extract')
  @Roles(Role.DENTIST)
  async extractNotes(@Body() body: { transcript: string }) {
    if (!body.transcript) {
      return { error: 'No transcript provided' };
    }
    return this.aiService.startExtraction(body.transcript);
  }

  @Get('extract/:taskId')
  @Roles(Role.DENTIST)
  async getExtractionStatus(@Param('taskId') taskId: string) {
    return this.aiService.getExtractionStatus(taskId);
  }
}
