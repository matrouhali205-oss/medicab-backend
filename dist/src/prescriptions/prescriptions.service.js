var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
let PrescriptionsService = class PrescriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.prescription.create({
            data: {
                patientId: data.patientId,
                dentistId: data.dentistId,
                instructions: data.instructions,
                medications: {
                    create: data.medications.map((med) => ({
                        medicationName: med.medicationName,
                        dosage: med.dosage,
                        duration: med.duration,
                        frequency: med.frequency,
                    }))
                }
            },
            include: { medications: true }
        });
    }
    async findByPatient(patientId) {
        return this.prisma.prescription.findMany({
            where: { patientId },
            include: { medications: true, dentist: { select: { firstName: true, lastName: true } } },
            orderBy: { date: 'desc' }
        });
    }
};
PrescriptionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PrescriptionsService);
export { PrescriptionsService };
//# sourceMappingURL=prescriptions.service.js.map