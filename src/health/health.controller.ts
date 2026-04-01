import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check() {
    const health: any = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? 'PRESENT (starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'MISSING',
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? 'PRESENT' : 'MISSING',
        PORT: process.env.PORT || 'not set',
      }
    };

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      health.database = 'CONNECTED';
    } catch (e: any) {
      health.database = 'ERROR: ' + e.message;
      health.status = 'error';
    }

    return health;
  }
}
