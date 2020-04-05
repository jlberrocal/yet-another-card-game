import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../models/user.entity';
import { Positions } from '@innoware/api-interfaces';

@Entity({
  name: 'games'
})
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(type => Player, player => player.gameRoom)
  players: Player[];

  @Column({
    type: 'tinyint',
    default: false
  })
  started: boolean;

  @Column({
    type: 'tinyint'
  })
  order: number;

  constructor(name: string, order: number = 0) {
    this.name = name;
    this.order = order;
  }
}

@Entity({
  name: 'players'
})
export class Player extends User {
  @Column({
    type: 'simple-enum',
    enum: Positions
  })
  position: Positions;

  @ManyToOne(type => Game, game => game.players)
  gameRoom: Game;
}
