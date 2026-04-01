import { PrismaService } from '../prisma/prisma.service';
export declare class DentalChartService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatientChart(patientId: string): Promise<any>;
    updateTooth(patientId: string, toothNumber: number, data: any): Promise<any>;
}
