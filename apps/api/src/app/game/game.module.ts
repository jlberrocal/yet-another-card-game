import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, Player } from './models/game.entity';
import { SocketsModule } from '../sockets/sockets.module';
import { MazeService } from '../maze/maze.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Player]),
    SocketsModule
  ],
  providers: [GameService, MazeService],
  controllers: [GameController]
})
export class GameModule {
}
