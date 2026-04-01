var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
let DentalChartService = class DentalChartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientChart(patientId) {
        return this.prisma.toothStatus.findMany({
            where: { patientId },
        });
    }
    async updateTooth(patientId, toothNumber, data) {
        return this.prisma.toothStatus.upsert({
            where: {
                patientId_toothNumber: {
                    patientId,
                    toothNumber
                }
            },
            update: {
                status: data.status,
                diagnosis: data.diagnosis,
                treatment: data.treatment,
                notes: data.notes
            },
            create: {
                patientId,
                toothNumber,
                status: data.status,
                diagnosis: data.diagnosis,
                treatment: data.treatment,
                notes: data.notes
            }
        });
    }
};
DentalChartService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], DentalChartService);
export { DentalChartService };
//# sourceMappingURL=dental-chart.service.js.map