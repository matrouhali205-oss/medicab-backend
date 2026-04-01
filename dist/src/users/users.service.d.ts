import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<any>;
    findById(id: string): Promise<any>;
    create(data: any): Promise<any>;
}
