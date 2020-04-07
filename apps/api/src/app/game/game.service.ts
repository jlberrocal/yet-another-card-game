import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, Player } from './models/game.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '@innoware/api-interfaces';

@Injectable()
export class GameService {
  constructor(@InjectRepository(Game) private readonly repository: Repository<Game>) {}

  save(dto: CreateRoomDto) {
    const game = new Game(dto.name);
    return this.repository.save(game);
  }

  async addPlayer(gameId: string, socketId: string) {
    const game = await this.repository.findOne(gameId, {
      relations: ['players']
    });
    const player = new Player();
    player.order = game.players.length;
    player.clientId = socketId;
    game.players.push(player);
    return this.repository.save(game);
  }
}
