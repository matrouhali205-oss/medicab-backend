import { PrismaService } from '../prisma/prisma.service';
export declare class DentalChartService {
    private prisma;
    constructor(prisma: PrismaService);
    getPatientChart(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        status: import(".prisma/client").$Enums.TStatus;
        toothNumber: number;
        diagnosis: string | null;
        treatment: string | null;
    }[]>;
    updateTooth(patientId: string, toothNumber: number, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        status: import(".prisma/client").$Enums.TStatus;
        toothNumber: number;
        diagnosis: string | null;
        treatment: string | null;
    }>;
}
