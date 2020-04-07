import { Positions } from './positions';
import { UserDto } from './user.dto';

export interface GameDto {
  id: string;
  name: string;
  players: Player[];
  started: boolean;
  order: number;
}

export interface Player extends UserDto {
  position: Positions;
}
