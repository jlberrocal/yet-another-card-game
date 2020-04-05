import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './models/game.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from '../../../../../libs/api-interfaces/src/lib/create-room.dto';

@Injectable()
export class GameService {
  constructor(@InjectRepository(Game) private readonly repository: Repository<Game>) {}

  save(dto: CreateRoomDto) {
    const game = new Game(dto.name);
    return this.repository.save(game);
  }
}
