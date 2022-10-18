import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
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
import { UserService } from '../services/user.service';
import { RepositoryService } from '../services/repository.service';

@UseInterceptors(CacheInterceptor)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly repositoryService: RepositoryService,
  ) {}

  @ApiOperation({
    summary:
      "Returns all of the users, filtered by the search query (eg. 'name=someone'). Returns all users by default.",
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false, type: 'string' })
  @ApiNotFoundResponse()
  @Get()
  async findUsers(@Query() query): Promise<User[]> {
    return await this.userService.findUsers(query);
  }

  @ApiOperation({
    summary:
      'Returns all of the repositories that contributed to the given user.',
  })
  @ApiOkResponse({ type: RepositoryResponse, isArray: true })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(':username/contributions')
  async findContributions(
    @Param('username') username: string,
  ): Promise<RepositoryResponse[]> {
    return await this.repositoryService.findContributions(username);
  }
}
