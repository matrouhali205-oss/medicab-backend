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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: 'PATIENT',
                    phone: data.phone,
                    patient: {
                        create: {
                            dateOfBirth: new Date(data.dateOfBirth),
                            gender: data.gender,
                            bloodType: data.bloodType,
                            allergies: data.allergies,
                            medicalHistory: data.medicalHistory,
                        }
                    }
                },
                include: { patient: true }
            });
            return user;
        }
        catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                throw new common_1.ConflictException('A user with this email already exists.');
            }
            throw error;
        }
    }
    async findAll() {
        return this.prisma.patient.findMany({
            include: { user: true }
        });
    }
    async findOne(id) {
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: {
                user: true,
                appointments: true,
                teeth: true,
                records: true,
                prescriptions: true
            }
        });
        if (!patient)
            throw new common_1.NotFoundException('Patient not found');
        return patient;
    }
    async update(id, updateData) {
        return this.prisma.patient.update({
            where: { id },
            data: updateData,
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map