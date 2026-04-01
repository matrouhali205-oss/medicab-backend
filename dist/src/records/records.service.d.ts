import { PrismaService } from '../prisma/prisma.service';
export declare class RecordsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findByPatient(patientId: string): Promise<any>;
}
