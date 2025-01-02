import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, validate } from './config';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';

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
