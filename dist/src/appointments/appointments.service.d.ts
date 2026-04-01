import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        dentistId: string;
        date: Date;
        durationMinutes: number;
        type: import(".prisma/client").$Enums.ApptType;
        status: import(".prisma/client").$Enums.ApptStatus;
    }>;
    findAll(): Promise<({
        patient: {
            user: {
                id: string;
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.Role;
                phone: string | null;
                avatar: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date | null;
            gender: string | null;
            bloodType: string | null;
            allergies: string | null;
            medicalHistory: string | null;
            notes: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        dentistId: string;
        date: Date;
        durationMinutes: number;
        type: import(".prisma/client").$Enums.ApptType;
        status: import(".prisma/client").$Enums.ApptStatus;
    })[]>;
    findByDentist(dentistId: string): Promise<({
        patient: {
            user: {
                id: string;
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                role: import(".prisma/client").$Enums.Role;
                phone: string | null;
                avatar: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date | null;
            gender: string | null;
            bloodType: string | null;
            allergies: string | null;
            medicalHistory: string | null;
            notes: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        dentistId: string;
        date: Date;
        durationMinutes: number;
        type: import(".prisma/client").$Enums.ApptType;
        status: import(".prisma/client").$Enums.ApptStatus;
    })[]>;
    updateStatus(id: string, status: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        patientId: string;
        dentistId: string;
        date: Date;
        durationMinutes: number;
        type: import(".prisma/client").$Enums.ApptType;
        status: import(".prisma/client").$Enums.ApptStatus;
    }>;
}
