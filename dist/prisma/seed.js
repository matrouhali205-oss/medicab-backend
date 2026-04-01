import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt-ts';
const prisma = new PrismaClient();
async function main() {
    console.log('Seeding database...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const drSarah = await prisma.user.upsert({
        where: { email: 'dr.sarah@medicab.com' },
        update: {},
        create: {
            email: 'dr.sarah@medicab.com',
            password: hashedPassword,
            firstName: 'Sarah',
            lastName: 'Smith',
            role: Role.DENTIST,
        },
    });
    console.log('Created user:', drSarah.email);
    const aliceAssistant = await prisma.user.upsert({
        where: { email: 'alice.reception@medicab.com' },
        update: {},
        create: {
            email: 'alice.reception@medicab.com',
            password: hashedPassword,
            firstName: 'Alice',
            lastName: 'Reception',
            role: Role.ASSISTANT,
        },
    });
    console.log('Created user:', aliceAssistant.email);
    console.log('Seeding finished. Only staff users remain.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map