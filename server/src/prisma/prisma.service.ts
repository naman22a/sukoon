import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: ['warn', 'query', 'error', 'info'],
        });
    }

    onModuleInit() {
        this.$connect();
    }
}
