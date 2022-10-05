import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataService } from '../services//data.service';

@ApiTags('Sync database')
@Controller()
export class DataController {
  constructor(
    private readonly dataService: DataService
  ) { }

  @ApiOperation({ summary: "Collect the data from the GitHub API and update the database" })
  @Get('sync')
  async syncDB(): Promise<any> {
    return this.dataService.syncDB();
  }
}
