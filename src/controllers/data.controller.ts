import { Controller, Get } from '@nestjs/common';
import { DataService } from '../services//data.service';

@Controller('api/v1')
export class DataController {
  constructor(
    private readonly dataService: DataService
  ) { }

  @Get('sync')
  async syncDB(): Promise<any> {
    return 'sync complete';
  }


}
