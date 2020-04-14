import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from '@innoware/api-interfaces';
import { GameService } from './game.service';
import { GameGateway } from '../sockets/game.gateway';
import { MazeService } from '../maze/maze.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../models/user.entity';

export type RequestWithUser = Request & { user: User }

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService,
              private readonly mazeService: MazeService,
              private readonly gateway: GameGateway) {
  }

  @Get('/')
  getRooms() {
    return this.gameService.runningGames();
  }

  @Post('/create')
  createRoom(@Body() body: CreateRoomDto, @Req() { user }: RequestWithUser) {
    return this.gameService.save(body, user);
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
