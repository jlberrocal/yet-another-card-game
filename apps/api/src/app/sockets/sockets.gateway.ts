import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketEvents } from '@innoware/api-interfaces';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args): any {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: Socket): any {
    console.log('client disconnected', client.id);
  }

  afterInit(server: Server): any {
    this.server = server;
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }

  @SubscribeMessage(SocketEvents.CREATE)
  createRoom(client: Socket, roomId: string) {
    client.join(roomId);
    const nsp = this.server.of(roomId);
    nsp.on('connection', (sClient) => {
      sClient.emit('data', 'hello from namespace');
    });
    return 'namespace created';
  }
}
