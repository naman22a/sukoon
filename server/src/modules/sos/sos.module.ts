import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosGateway } from './sos.gateway';

@Module({
    providers: [SosService, SosGateway],
})
export class SosModule {}
