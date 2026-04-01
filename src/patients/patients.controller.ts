import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN)
  @Post()
  create(@Body() data: any) {
    return this.patientsService.create(data);
  }

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.patientsService.update(id, data);
  }
}
