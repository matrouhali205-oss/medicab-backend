import { PrismaService } from '../prisma/prisma.service';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateData: any): Promise<any>;
}
