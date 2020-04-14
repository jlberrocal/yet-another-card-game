import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
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

  @OneToMany(type => Player, player => player.gameRoom, {
    cascade: true
  })
  players: Player[];

  @Column({
    type: 'tinyint',
    default: false
  })
  started: boolean;

  constructor(name: string) {
    this.name = name;
    this.started = true;
  }
}

@Entity({
  name: 'players'
})
export class Player {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    type: 'simple-enum',
    enum: Positions,
    nullable: true
  })
  position: Positions;

  @ManyToOne(type => Game, game => game.players)
  gameRoom: Game;

  @Column({
    type: 'tinyint'
  })
  order: number;

  @Column({
    nullable: true
  })
  clientId: string;

  @Column({
    type: 'tinyint',
    default: false
  })
  owner: boolean;

  constructor(id: number, name: string, username: string, order: number = 0) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.order = order;
  }
}
