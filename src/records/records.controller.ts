import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Roles(Role.DENTIST, Role.ASSISTANT)
  @Post()
  create(@Body() data: any) {
    return this.recordsService.create(data);
  }

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT)
  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.recordsService.findByPatient(patientId);
  }
}
