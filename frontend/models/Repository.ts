import { IUser } from './User';

export interface IRepository {
  id: number;
  owner: IUser;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  contributorsCount: number;
}

