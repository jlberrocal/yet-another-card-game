import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LoggerFactory } from '../utils/logger-factory';
import { Logger } from '@nestjs/common';
import { GameService } from '../game/game.service';
import { GameDto, SocketEvents, UserDto } from '@innoware/api-interfaces';
import { Player } from '../game/models/game.entity';
import { MazeService } from '../maze/maze.service';

@WebSocketGateway({
  namespace: /game/
})
export class GameGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  @LoggerFactory()
  private logger: Logger;

  constructor(private readonly gameService: GameService,
              private readonly mazeService: MazeService) {
  }

  handleConnection(client: Socket, ...args): any {
    console.log('client connected to namespace', client.id);
  }

  handleDisconnect(client: Socket): any {
    console.log('client disconnected from namespace', client.id);
  }

  afterInit(server: Server): any {
    this.server = server;
  }

  @SubscribeMessage(SocketEvents.JOIN)
  async handleMessage(client: Socket, payload: UserDto & { room: string }): Promise<GameDto> {
    const { room, ...user } = payload;
    const game = await this.gameService.getGame(room);
    const playersIds = game.players.map(player => player.id);
    if (!playersIds.includes(user.id)) {
      const player = new Player(user.id, user.name, user.username, game.players.length);
      player.clientId = client.id;
      game.players.push(player);
    } else {
      const player = game.players.find(p => p.id === user.id);
      player.clientId = client.id;
    }
    if (game.players.length >= 4) {
      const owner = game.players.find(p => p.owner)
      this.logger.log(owner);
      this.server.to(owner.clientId).emit(SocketEvents.READY2DEAL);
    }
    return this.gameService.update(game);
  }

  @SubscribeMessage(SocketEvents.DEAL)
  async deal(client: Socket, room: string): Promise<null> {
    const game = await this.gameService.getGame(room);
    const iterator = this.mazeService.generateHands();
    let card = iterator.next();
    while (!card.done) {
      game.players.forEach(player => {
        const value = card.value;
        this.server.to(player.clientId).emit(SocketEvents.CARD, value);
        card = iterator.next();
      });
    }
    return null;
  }
}
