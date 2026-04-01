var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async extractNotes(body) {
        if (!body.transcript) {
            return { error: 'No transcript provided' };
        }
        return this.aiService.startExtraction(body.transcript);
    }
    async getExtractionStatus(taskId) {
        return this.aiService.getExtractionStatus(taskId);
    }
};
__decorate([
    Post('extract'),
    Roles(Role.DENTIST),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "extractNotes", null);
__decorate([
    Get('extract/:taskId'),
    Roles(Role.DENTIST),
    __param(0, Param('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getExtractionStatus", null);
AiController = __decorate([
    Controller('ai'),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof AiService !== "undefined" && AiService) === "function" ? _a : Object])
], AiController);
export { AiController };
//# sourceMappingURL=ai.controller.js.map