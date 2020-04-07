import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../models/user.entity';
import { Positions } from '@innoware/api-interfaces';

@Entity({
  name: 'games'
})
@Unique(['name'])
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

  constructor(name: string) {
    this.name = name;
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

  @Column({
    type: 'tinyint'
  })
  order: number;

  @Column()
  clientId: string;
}
