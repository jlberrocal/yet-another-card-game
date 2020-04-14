import { Module } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway';
import { GameGateway } from './game.gateway';
import { GameService } from '../game/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, Player } from '../game/models/game.entity';
import { MazeService } from '../maze/maze.service';

export const gateways = [SocketsGateway, GameGateway];

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Player]),
  ],
  providers: [
    GameService,
    MazeService,
    ...gateways
  ],
  exports: gateways
})
export class SocketsModule {
}
