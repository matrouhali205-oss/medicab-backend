import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.medicalRecord.create({
      data: {
        patientId: data.patientId,
        type: data.type,
        description: data.description,
        aiSummary: data.aiSummary,
      }
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.medicalRecord.findMany({
      where: { patientId },
      include: { attachments: true },
      orderBy: { date: 'desc' }
    });
  }
}
