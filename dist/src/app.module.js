var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [PrismaModule, AuthModule, UsersModule, PatientsModule, AppointmentsModule, DentalChartModule, RecordsModule, PrescriptionsModule, MessagesModule, AiModule, TeleconsultationModule],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map