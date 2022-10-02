import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataService {
  private apiUrl = 'https://api.github.com/orgs/facebook/repos';
  private options = {
    headers: {
      Authorization: `Token ${this.configService.get('GITHUB_ACCESS_TOKEN')}`
    }
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }


}
