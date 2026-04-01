import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DentalChartModule } from './dental-chart/dental-chart.module';
import { RecordsModule } from './records/records.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { MessagesModule } from './messages/messages.module';
import { AiModule } from './ai/ai.module';
import { TeleconsultationModule } from './teleconsultation/teleconsultation.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, PatientsModule, AppointmentsModule, DentalChartModule, RecordsModule, PrescriptionsModule, MessagesModule, AiModule, TeleconsultationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
