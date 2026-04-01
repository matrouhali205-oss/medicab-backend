import { PrismaService } from '../prisma/prisma.service';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        patient: {
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
        } | null;
    } & {
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
    }>;
    findAll(): Promise<({
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
    })[]>;
    findOne(id: string): Promise<{
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
        appointments: {
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
        }[];
        teeth: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            patientId: string;
            status: import(".prisma/client").$Enums.TStatus;
            toothNumber: number;
            diagnosis: string | null;
            treatment: string | null;
        }[];
        records: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            date: Date;
            type: import(".prisma/client").$Enums.RecordType;
            description: string;
            aiSummary: string | null;
        }[];
        prescriptions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            dentistId: string;
            date: Date;
            instructions: string | null;
            pdfUrl: string | null;
        }[];
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
    }>;
    update(id: string, updateData: any): Promise<{
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
    }>;
}
