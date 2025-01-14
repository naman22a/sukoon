import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TipsService } from './tips.service';
import { CreateTipDto } from './types';

@WebSocketGateway()
export class TipsGateway {
    constructor(private tipsService: TipsService) {}

    @SubscribeMessage('tips')
    async findNearbyTips(
        _socket: Socket,
        @MessageBody('latitude') latitude: number,
        @MessageBody('longitude') longitude: number,
    ) {
        const nearbyTips = await this.tipsService.getNearbyTips(
            latitude,
            longitude,
        );

        return nearbyTips;
    }

    @SubscribeMessage('create_tip')
    async createTip(_socket: Socket, @MessageBody() body: CreateTipDto) {
        await this.tipsService.create(body);
        return body;
    }
}
