import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SosService } from './sos.service';

interface SosPayload {
    latitude: number;
    longitude: number;
    userId: number;
}

@WebSocketGateway()
export class SosGateway {
    constructor(private sosService: SosService) {}

    @SubscribeMessage('sos')
    async handleSos(socket: Socket, payload: string) {
        const { userId, latitude, longitude } = JSON.parse(
            payload,
        ) as SosPayload;
        const sos = await this.sosService.createSos(
            userId,
            latitude,
            longitude,
        );
        socket.emit('send_sos', sos);
    }
}
