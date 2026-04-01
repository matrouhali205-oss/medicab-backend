import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly apptsService: AppointmentsService) {}

  @Roles(Role.DENTIST, Role.ASSISTANT, Role.PATIENT)
  @Post()
  create(@Body() data: any, @Request() req: any) {
    if (!data.dentistId && (req.user.role === 'DENTIST')) {
      data.dentistId = req.user.id;
    }
    return this.apptsService.create(data);
  }

  @Roles(Role.DENTIST, Role.ASSISTANT)
  @Get()
  findAll() {
    return this.apptsService.findAll();
  }

  @Roles(Role.DENTIST)
  @Get('my-agenda')
  findByDentist(@Request() req: any) {
    return this.apptsService.findByDentist(req.user.id);
  }

  @Roles(Role.DENTIST, Role.ASSISTANT)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: any) {
    return this.apptsService.updateStatus(id, status);
  }
}
