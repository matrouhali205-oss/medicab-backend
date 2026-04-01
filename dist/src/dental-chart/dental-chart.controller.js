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
import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { DentalChartService } from './dental-chart.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
let DentalChartController = class DentalChartController {
    dentalChartService;
    constructor(dentalChartService) {
        this.dentalChartService = dentalChartService;
    }
    getPatientChart(patientId) {
        return this.dentalChartService.getPatientChart(patientId);
    }
    updateTooth(patientId, toothNumber, data) {
        return this.dentalChartService.updateTooth(patientId, parseInt(toothNumber, 10), data);
    }
};
__decorate([
    Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT),
    Get(':patientId'),
    __param(0, Param('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DentalChartController.prototype, "getPatientChart", null);
__decorate([
    Roles(Role.DENTIST),
    Put(':patientId/tooth/:toothNumber'),
    __param(0, Param('patientId')),
    __param(1, Param('toothNumber')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DentalChartController.prototype, "updateTooth", null);
DentalChartController = __decorate([
    UseGuards(AuthGuard('jwt'), RolesGuard),
    Controller('dental-chart'),
    __metadata("design:paramtypes", [typeof (_a = typeof DentalChartService !== "undefined" && DentalChartService) === "function" ? _a : Object])
], DentalChartController);
export { DentalChartController };
//# sourceMappingURL=dental-chart.controller.js.map