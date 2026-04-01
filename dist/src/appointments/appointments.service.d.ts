import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findByDentist(dentistId: string): Promise<any>;
    updateStatus(id: string, status: any): Promise<any>;
}
