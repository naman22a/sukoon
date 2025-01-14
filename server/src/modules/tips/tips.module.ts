import { Module } from '@nestjs/common';
import { TipsGateway } from './tips.gateway';
import { TipsService } from './tips.service';

@Module({
    providers: [TipsGateway, TipsService],
})
export class TipsModule {}
