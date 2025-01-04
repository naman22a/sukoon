import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Modules
import { UsersModule } from './shared';
import { SosModule, TipsModule } from './modules';

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
        PrismaModule,
        AuthModule,

        // Modules
        UsersModule,
        SosModule,
        TipsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
