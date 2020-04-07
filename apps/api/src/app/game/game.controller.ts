import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from '@innoware/api-interfaces';
import { GameService } from './game.service';
import { GameGateway } from '../sockets/game.gateway';
import { MazeService } from '../maze/maze.service';
import { SocketsGateway } from '../sockets/sockets.gateway';

@Controller('game')
//@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService,
              private readonly mazeService: MazeService,
              private readonly gateway: GameGateway,
              private rootGateway: SocketsGateway) {
  }

  @Post('/create')
  createRoom(@Body() body: CreateRoomDto) {
    return this.gameService.save(body);
  }

  @Get('/deal/:room')
  async deal(@Param('room') room: string) {
    const iterator = this.mazeService.generateHands();
    const { server } = this.gateway as any;
    let card = iterator.next();
    const clients = server.server.nsps[`/game-${room}`].clients().connected;
    while (!card.done) {
      for (const client of Object.values(clients)) {
        const value = await card.value;
        const { player, ...cardValue } = await value;
        (client as any).emit('card', cardValue);
        card = iterator.next();
      }
    }

    return {
      foo: 'bar'
    };
  }
}
