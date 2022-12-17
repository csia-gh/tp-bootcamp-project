import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { RepositoryResponse } from '../types/RepositoryResponse';
import { RepositoryService } from '../services/repository.service';
import { ValidatePsqlId } from '../pipes/validatePsqlId.pipe';

@UseInterceptors(CacheInterceptor)
@ApiTags('Repository')
@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @ApiOperation({
    summary:
      "Returns all of the repositories, filtered by the search query (eg. 'language=javascript'). Returns all repositories by default.",
  })
  @ApiOkResponse({ type: RepositoryResponse, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiQuery({ name: 'language', required: false, type: 'string' })
  @ApiNotFoundResponse()
  @Get()
  async findRepositories(@Query() query): Promise<RepositoryResponse[]> {
    return await this.repositoryService.findRepositories(query);
  }

  @ApiOperation({
    summary:
      'Returns all of the users who contributed to the given repository.',
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(':id/contributors')
  async findContributors(
    @Param('id', ParseIntPipe, ValidatePsqlId) repositoryId: number,
  ): Promise<User[]> {
    return await this.repositoryService.findContributors(repositoryId);
  }
}
