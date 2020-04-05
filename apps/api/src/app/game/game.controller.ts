import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoomDto } from '../../../../../libs/api-interfaces/src/lib/create-room.dto';
import { GameService } from './game.service';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  constructor(private readonly gameService: GameService) {
  }

  @Post('/create')
  createRoom(@Body() body: CreateRoomDto) {
    console.log(body);
    return this.gameService.save(body);
  }
}
