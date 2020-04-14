import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, Player } from './models/game.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '@innoware/api-interfaces';
import { User } from '../models/user.entity';

@Injectable()
export class GameService {
  constructor(@InjectRepository(Game) private readonly repository: Repository<Game>) {}

  save(dto: CreateRoomDto, creator: User) {
    const game = new Game(dto.name);
    const player = new Player(creator.id, creator.name, creator.username);
    game.players = [player];

    return this.repository.save(game);
  }

  async runningGames(): Promise<Game[]> {
    return this.repository.find({
      where: {
        started: true
      },
      relations: ['players']
    });
  }

  getGame(id: string) {
    return this.repository.findOne(id, {
      relations: ['players']
    });
  }

  update(game: Game) {
    return this.repository.save(game);
  }
}
