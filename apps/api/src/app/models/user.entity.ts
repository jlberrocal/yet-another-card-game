import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({
  name: 'users'
})
@Unique(['name', 'username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
