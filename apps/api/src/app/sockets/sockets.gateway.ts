import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayConnection, OnGatewayInit {
  server: Server;

  handleConnection(client: any, ...args): any {
    console.log('client connected');
  }

  afterInit(server: Server): any {
    this.server = server;
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }
}
