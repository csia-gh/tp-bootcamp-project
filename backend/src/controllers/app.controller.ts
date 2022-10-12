import { CacheInterceptor, Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidatePsqlId } from 'src/pipes/validatePsqlId.pipe';
import { User } from '../entities/user.entity';
import { AppService } from '../services/app.service';
import { RepositoryResponse } from '../types/RepositoryResponse';

@UseInterceptors(CacheInterceptor)
@ApiTags('Endpoints')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: "Returns all of the repositories, filtered by the search query (eg. 'language=javascript'). Returns all repositories by default." })
  @ApiOkResponse({ type: RepositoryResponse, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiQuery({ name: 'language', required: false, type: 'string' })
  @Get('repository')
  async findRepositories(@Query() query: string): Promise<RepositoryResponse[]> {
    return await this.appService.findRepositories(query);
  }

  @ApiOperation({ summary: "Returns all of the users who contributed to the given repository." })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('repository/:id/contributors')
  async findContributors(@Param('id', ParseIntPipe, ValidatePsqlId) repositoryId: number): Promise<User[]> {
    return await this.appService.findContributors(repositoryId);
  }

  @ApiOperation({ summary: "Returns all the users.." })
  @ApiOkResponse({ type: User, isArray: true })
  @Get('user')
  async findUsers(): Promise<User[]> {
    return await this.appService.findUsers();
  }
}