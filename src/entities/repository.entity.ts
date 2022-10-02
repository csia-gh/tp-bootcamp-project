import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Repository {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.repositories)
  owner: User;

  @Column()
  full_name: string;

  @Column()
  description: string;

  @Column()
  html_url: string;

  @Column()
  language: string;

  @Column()
  stargazers_count: number;

  @ManyToMany(() => User, (user) => user.contributions)
  contributors: User[];
}