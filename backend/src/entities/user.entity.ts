import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RepositoryEntity } from './repository.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

  @ApiProperty()
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  avatar_url: string;

  @ApiProperty()
  @Column()
  html_url: string;

  @ApiProperty()
  @Column()
  type: string;

  @OneToMany(() => RepositoryEntity, (repository) => repository.owner)
  repositories: RepositoryEntity[];

  @ManyToMany(() => RepositoryEntity, (repository) => repository.contributors)
  contributions: RepositoryEntity[];
}
