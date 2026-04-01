"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DentalChartController = void 0;
const common_1 = require("@nestjs/common");
const dental_chart_service_1 = require("./dental-chart.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
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
exports.DentalChartController = DentalChartController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.DENTIST, client_1.Role.ASSISTANT, client_1.Role.PATIENT),
    (0, common_1.Get)(':patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DentalChartController.prototype, "getPatientChart", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.DENTIST),
    (0, common_1.Put)(':patientId/tooth/:toothNumber'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('toothNumber')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DentalChartController.prototype, "updateTooth", null);
exports.DentalChartController = DentalChartController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('dental-chart'),
    __metadata("design:paramtypes", [dental_chart_service_1.DentalChartService])
], DentalChartController);
//# sourceMappingURL=dental-chart.controller.js.map