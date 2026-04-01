import { DentalChartService } from './dental-chart.service';
export declare class DentalChartController {
    private readonly dentalChartService;
    constructor(dentalChartService: DentalChartService);
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
    updateTooth(patientId: string, toothNumber: string, data: any): Promise<{
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
