import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.appointment.create({
      data: {
        patientId: data.patientId,
        dentistId: data.dentistId,
        date: new Date(data.date),
        durationMinutes: data.durationMinutes,
        type: data.type,
        notes: data.notes
      }
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: { include: { user: true } },
      },
      orderBy: { date: 'asc' }
    });
  }

  async findByDentist(dentistId: string) {
    return this.prisma.appointment.findMany({
      where: { dentistId },
      include: {
        patient: { include: { user: true } },
      },
      orderBy: { date: 'asc' }
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status }
    });
  }
}
