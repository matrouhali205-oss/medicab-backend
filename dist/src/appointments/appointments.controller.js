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
import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
let AppointmentsController = class AppointmentsController {
    apptsService;
    constructor(apptsService) {
        this.apptsService = apptsService;
    }
    create(data, req) {
        if (!data.dentistId && (req.user.role === 'DENTIST')) {
            data.dentistId = req.user.id;
        }
        return this.apptsService.create(data);
    }
    findAll() {
        return this.apptsService.findAll();
    }
    findByDentist(req) {
        return this.apptsService.findByDentist(req.user.id);
    }
    updateStatus(id, status) {
        return this.apptsService.updateStatus(id, status);
    }
};
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT),
    Post(),
    __param(0, Body()),
    __param(1, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    Roles(Role.DENTIST),
    Get('my-agenda'),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findByDentist", null);
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT),
    Patch(':id/status'),
    __param(0, Param('id')),
    __param(1, Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "updateStatus", null);
AppointmentsController = __decorate([
    UseGuards(AuthGuard('jwt'), RolesGuard),
    Controller('appointments'),
    __metadata("design:paramtypes", [AppointmentsService])
], AppointmentsController);
export { AppointmentsController };
//# sourceMappingURL=appointments.controller.js.map