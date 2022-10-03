import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { RepositoriesResponse } from '../types/repositoryResponse.interface';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('repository')
  async findRepositories(@Query() query: string): Promise<RepositoriesResponse[]> {
    return await this.appService.findRepositories(query);
  }

  @Get('repository/:id/contributions')
  async findContributors(@Param('id') repositoryId: string):Promise<User[]> {
    return await this.appService.findContributors(repositoryId);
  }

  @Get('user')
  async findUsers():Promise<User[]> {
    return await this.appService.findUsers();
  }
}
