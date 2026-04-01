import { PrismaService } from '../prisma/prisma.service';
export declare class RecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        date: Date;
        type: import(".prisma/client").$Enums.RecordType;
        description: string;
        aiSummary: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
        attachments: {
            id: string;
            medicalRecordId: string;
            url: string;
            filename: string;
            mimetype: string;
            size: number;
            uploadedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        date: Date;
        type: import(".prisma/client").$Enums.RecordType;
        description: string;
        aiSummary: string | null;
    })[]>;
}
