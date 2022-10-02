import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('repository')
  async findAllRepositories(@Query() query) {
    return await this.appService.findAllRepositories(query);
  }
}
