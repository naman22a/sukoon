import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

// Modules
import { UsersModule } from './shared';
import { SosModule } from './modules';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            load: [configuration],
            validate,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // in ms
                limit: 10,
            },
        ]),
        PrismaModule,
        AuthModule,

        // Modules
        UsersModule,
        SosModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
