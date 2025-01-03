import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { __prod__, COOKIE_NAME } from './common/constants';
import { redis } from './common/redis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare module 'express-session' {
    interface SessionData {
        userId: number;
    }
}

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // CONFIGURATION
    const config = app.get(ConfigService<ConfigurationType>);
    const port = config.get('port');
    const origin = config.get('origin');

    // validation
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[] = []) => {
                const newErrors = errors.map((error) => {
                    const validationErrors = [];
                    for (let err in error.constraints) {
                        validationErrors.push(error.constraints[err]);
                    }
                    return {
                        field: error.property,
                        message: validationErrors[0],
                    };
                });
                return new BadRequestException({
                    ok: false,
                    errors: newErrors,
                });
            },
        }),
    );

    // MIDDLEWARE
    // cors
    app.enableCors({ origin, credentials: true });
    // sessions
    app.set('trust proxy', 1);
    app.use(
        session({
            name: COOKIE_NAME,
            secret: process.env.SESSION_SECRET,
            resave: false,
            cookie: {
                sameSite: 'lax',
                httpOnly: true,
                secure: __prod__,
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                domain: __prod__ ? process.env.COOKIE_DOMAIN : undefined,
            },
            store: new RedisStore({ client: redis }),
            saveUninitialized: false,
            proxy: __prod__,
        }),
    );

    // Swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Sukoon API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}
bootstrap();
