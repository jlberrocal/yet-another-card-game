import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from '@innoware/api-interfaces';
import { GameService } from './game.service';
import { GameGateway } from '../sockets/game.gateway';
import { MazeService } from '../maze/maze.service';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService,
              private readonly mazeService: MazeService,
              private readonly gateway: GameGateway) {
  }

  @Post('/create')
  async createRoom(@Body() body: CreateRoomDto) {
    const game = await this.gameService.save(body);
    this.gateway.server.of(game.id);
    return game;
  }

  @Get('/deal/:players')
  async deal(@Param('players', new ParseIntPipe()) players: number, @Query('ns') ns: string) {
    const iterator = this.mazeService.generateHands(['1', '2', '3', '4']);
    const { server } = this.gateway;
    let card = iterator.next();
    while (!card.done) {
      const value = await card.value;
      if (value.player === '1') {
        const { player, ...cardValue } = await value;
        setTimeout(() => server.emit('card', cardValue), 2000);
      }
      card = iterator.next();
    }

    return {
      foo: 'bar'
    };
  }
}
