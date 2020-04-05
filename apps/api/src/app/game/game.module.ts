import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, Player } from './models/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Player])
  ],
  providers: [GameService],
  controllers: [GameController]
})
export class GameModule {}
