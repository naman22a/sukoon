import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';
import { SosGateway } from './sos.gateway';

@Module({
    providers: [SosService, SosGateway],
    controllers: [SosController],
})
export class SosModule {}
