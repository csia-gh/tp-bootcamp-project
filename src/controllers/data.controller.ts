import { Controller, Get } from '@nestjs/common';
import { DataService } from '../services//data.service';

@Controller()
export class DataController {
  constructor(
    private readonly dataService: DataService
  ) { }

  @Get('sync')
  async syncDB(): Promise<any> {
    return this.dataService.syncDB();
  }
}
