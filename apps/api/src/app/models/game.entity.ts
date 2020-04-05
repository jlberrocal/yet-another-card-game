import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'games'
})
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  participants: string;
}
