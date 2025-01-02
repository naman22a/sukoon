import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // CONFIGURATION
    const config = app.get(ConfigService<ConfigurationType>);
    const port = config.get('port');
    const origin = config.get('origin');

    // MIDDLEWARE
    // cors
    app.enableCors({ origin, credentials: true });

    await app.listen(port);
}
bootstrap();
