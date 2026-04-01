import { RecordsService } from './records.service';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
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
