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

        // save sos in database
        await this.sosService.createSos(userId, latitude, longitude);

        // send sos to users nearby in radius of 5 km
        await this.sosService.notifyNearbyUsers(socket, latitude, longitude);

        // send sos to police nearby in radius of 5 km
        await this.sosService.notifyNearbyPolice(socket, latitude, longitude);
    }
}
