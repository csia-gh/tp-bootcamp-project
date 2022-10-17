import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from '../entities/repository.entity';
import { User } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RepositoryResponse } from '../types/RepositoryResponse';

@Injectable()
export class AppService {
  constructor(
    private readonly connection: DataSource,
    @InjectRepository(RepositoryEntity)
    private repositoryRepo: Repository<RepositoryEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  private async filterRepositories(key: string, value: string) {
    const queryBuilder = this.repositoryRepo.createQueryBuilder('repository');

    switch (key) {
      case 'name':
        queryBuilder.where('repository.full_name like :name', {
          name: `%facebook/${value}%`,
        });
        break;
      case 'language':
        queryBuilder.where('repository.language = :language', {
          language: value,
        });
        break;
      default:
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return await queryBuilder
      .leftJoinAndSelect('repository.contributors', 'contributors')
      .leftJoinAndSelect('repository.owner', 'owner')
      .getMany();
  }

  async findRepositories(query): Promise<RepositoryResponse[]> {
    const isEmpty = Object.keys(query).length === 0;
    let repositories;

    if (isEmpty) {
      repositories = await this.repositoryRepo.find({
        relations: ['owner', 'contributors'],
      });
    } else {
      const key = Object.keys(query)[0];
      const value = query[key];
      repositories = await this.filterRepositories(key, value);
    }

    if (!repositories.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.buildRepositoryResponses(repositories);
  }

  private buildRepositoryResponses(
    repositories: RepositoryEntity[],
  ): RepositoryResponse[] {
    return repositories.map((repository) => {
      const contributorsCount = repository.contributors.length;
      const repostoryResponse = {
        ...repository,
        contributorsCount,
      } as RepositoryResponse;
      delete repostoryResponse.contributors;
      return repostoryResponse;
    });
  }

  async findContributors(id: number): Promise<User[]> {
    const repository = await this.repositoryRepo.findOne({
      where: { id },
      relations: ['contributors'],
    });

    if (!repository) {
      throw new HttpException(
        'Repository does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return repository.contributors;
  }

  async findUsers(query): Promise<User[]> {
    const queryBuilder = this.userRepo.createQueryBuilder('user');
    const name = query['name'];

    if (!name) {
      return await queryBuilder.getMany();
    }

    const users = await queryBuilder
      .where('user.login like :name', {
        name: `%${name}%`,
      })
      .getMany();

    if (!users.length) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findContributions(username: string): Promise<RepositoryResponse[]> {
    const user = await this.userRepo.findOne({
      where: { login: username },
      relations: ['contributions'],
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return this.buildRepositoryResponses(user.contributions);
  }
}
