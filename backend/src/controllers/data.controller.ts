import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataService } from '../services//data.service';

@ApiTags('Sync database')
@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiOperation({
    summary: 'Collect the data from the GitHub API and update the database',
  })
  @Get('sync')
  async syncDB(): Promise<string> {
    return this.dataService.syncDB();
  }
}
