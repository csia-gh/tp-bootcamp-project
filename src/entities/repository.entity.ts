import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'repository' })
export class RepositoryEntity {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.repositories, {
    cascade: ["insert"],
  })
  owner: User;

  @Column()
  full_name: string;

  @Column()
  description: string;

  @Column()
  html_url: string;

  @Column({ nullable: true })
  language: string;

  @Column()
  stargazers_count: number;

  @ManyToMany(() => User, (user) => user.contributions, {
    cascade: ["insert"],
  })
  @JoinTable({ name: 'contributions' })
  contributors: User[];
}