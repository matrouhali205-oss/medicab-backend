import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DentalChartService {
  constructor(private prisma: PrismaService) {}

  async getPatientChart(patientId: string) {
    return this.prisma.toothStatus.findMany({
      where: { patientId },
    });
  }

  async updateTooth(patientId: string, toothNumber: number, data: any) {
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
}
