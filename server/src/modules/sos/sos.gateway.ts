import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class SosGateway {
    @SubscribeMessage('name')
    handleMessage(socket: Socket, name: string) {
        socket.emit('send_name', `Hello ${name}`);
    }
}
