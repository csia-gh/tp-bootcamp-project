import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RepositoryEntity } from './repository.entity';

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

  @OneToMany(() => RepositoryEntity, (repository) => repository.owner)
  repositories: RepositoryEntity[];

  @ManyToMany(() => RepositoryEntity, repository => repository.contributors)
  contributions: RepositoryEntity[];
}