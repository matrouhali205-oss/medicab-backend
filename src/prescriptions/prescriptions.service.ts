import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.prescription.create({
      data: {
        patientId: data.patientId,
        dentistId: data.dentistId,
        instructions: data.instructions,
        medications: {
          create: data.medications.map((med: any) => ({
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

  async findByPatient(patientId: string) {
    return this.prisma.prescription.findMany({
      where: { patientId },
      include: { medications: true, dentist: { select: { firstName: true, lastName: true } } },
      orderBy: { date: 'desc' }
    });
  }
}
