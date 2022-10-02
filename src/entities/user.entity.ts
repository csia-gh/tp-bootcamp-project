import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Repository } from './repository.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  avatar_url: string;

  @Column()
  html_url: string;

  @Column()
  type: string;

  @OneToMany(() => Repository, (repository) => repository.owner)
  repositories: Repository[];

  @ManyToMany(() => Repository, repository => repository.contributors)
  @JoinTable({ name: 'contributions' })
  contributions: Repository[];
}