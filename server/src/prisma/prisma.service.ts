import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: ['warn', 'query', 'error', 'info'],
        });
    }

    async onModuleInit() {
        let retries = 5;
        while (retries) {
            try {
                await this.$connect();
                break;
            } catch (error) {
                console.error(error);
                retries--;
                console.log('left:', retries);
                // sleep for 5 secs
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
    }
}
