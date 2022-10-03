import { User } from 'src/entities/user.entity';

export interface RepositoriesResponse {
  id: number;

  owner: User;

  full_name: string;

  description: string;

  html_url: string;

  language: string;

  stargazers_count: number;

  contributionsCount: number;
}
