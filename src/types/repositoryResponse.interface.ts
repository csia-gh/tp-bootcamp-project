import { User } from 'src/entities/user.entity';

export interface RepositoryResponse {
  id: number;

  owner: User;

  full_name: string;

  description: string;

  html_url: string;

  language: string;

  stargazers_count: number;

  contributors?: User[];

  contributionsCount: number;
}