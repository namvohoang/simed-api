import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(80, { namespace: 'events' })
export class EventsGateway {
	@SubscribeMessage('events')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() _client: Socket): string {
		return data;
	}
}
