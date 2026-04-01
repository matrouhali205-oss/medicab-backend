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
import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
let PatientsController = class PatientsController {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    create(data) {
        return this.patientsService.create(data);
    }
    findAll() {
        return this.patientsService.findAll();
    }
    findOne(id) {
        return this.patientsService.findOne(id);
    }
    update(id, data) {
        return this.patientsService.update(id, data);
    }
};
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findAll", null);
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT, Role.ADMIN),
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findOne", null);
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN),
    Put(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
PatientsController = __decorate([
    UseGuards(AuthGuard('jwt'), RolesGuard),
    Controller('patients'),
    __metadata("design:paramtypes", [PatientsService])
], PatientsController);
export { PatientsController };
//# sourceMappingURL=patients.controller.js.map