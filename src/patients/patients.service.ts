import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      // Create User first, then Patient profile
      const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // should be hashed in production
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
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('A user with this email already exists.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: { user: true }
    });
  }

  async findOne(id: string) {
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
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, updateData: any) {
    return this.prisma.patient.update({
      where: { id },
      data: updateData,
    });
  }
}
