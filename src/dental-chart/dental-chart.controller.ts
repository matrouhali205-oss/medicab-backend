import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { DentalChartService } from './dental-chart.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('dental-chart')
export class DentalChartController {
  constructor(private readonly dentalChartService: DentalChartService) {}

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT)
  @Get(':patientId')
  getPatientChart(@Param('patientId') patientId: string) {
    return this.dentalChartService.getPatientChart(patientId);
  }

  @Roles(Role.DENTIST)
  @Put(':patientId/tooth/:toothNumber')
  updateTooth(
    @Param('patientId') patientId: string,
    @Param('toothNumber') toothNumber: string,
    @Body() data: any
  ) {
    return this.dentalChartService.updateTooth(patientId, parseInt(toothNumber, 10), data);
  }
}
