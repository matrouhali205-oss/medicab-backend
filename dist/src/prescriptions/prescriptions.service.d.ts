import { PrismaService } from '../prisma/prisma.service';
export declare class PrescriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        medications: {
            id: string;
            medicationName: string;
            dosage: string;
            duration: string;
            frequency: string;
            prescriptionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        dentistId: string;
        date: Date;
        instructions: string | null;
        pdfUrl: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
        dentist: {
            firstName: string;
            lastName: string;
        };
        medications: {
            id: string;
            medicationName: string;
            dosage: string;
            duration: string;
            frequency: string;
            prescriptionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        dentistId: string;
        date: Date;
        instructions: string | null;
        pdfUrl: string | null;
    })[]>;
}
