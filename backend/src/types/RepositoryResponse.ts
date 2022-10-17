import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class RepositoryResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  owner: User;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  html_url: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  stargazers_count: number;

  contributors?: User[];

  @ApiProperty()
  contributorsCount: number;
}
