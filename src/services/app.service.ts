import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from 'src/entities/repository.entity';
import { User } from 'src/entities/user.entity';
import { RepositoriesResponse } from 'src/types/repositoryResponse.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private readonly connection: DataSource,
    @InjectRepository(RepositoryEntity) private repositoryRepo: Repository<RepositoryEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  getHello(): string {
    return 'Hellooo, api is listening...';
  }

  private parseId(id) {
    if (/^\d+$/.test(id)) return parseInt(id);
    throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
  }

  private async filterRepositories(key: string, value: string) {
    const queryBuilder = this.repositoryRepo
      .createQueryBuilder('repository');

    switch (key) {
      case 'name':
        queryBuilder.where('repository.full_name = :name', { name: `facebook/${value}` });
        break;
      case 'language':
        queryBuilder.where('repository.language = :language', { language: value });
        break;
      default:
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return await queryBuilder.getMany();
  }

  private async attachContributionsCount(repositories): Promise<RepositoriesResponse[]> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const repositoriesWithContributionsCount = await Promise.all(repositories.map(async repository => {
      const contributionsCount = await queryRunner.query(`SELECT COUNT(*) FROM contributions WHERE "repositoryId"=${repository.id}`);
      repository.contributionsCount = contributionsCount[0].count;
      return repository;
    }));

    await queryRunner.release();

    return repositoriesWithContributionsCount;
  }

  async findRepositories(query): Promise<RepositoriesResponse[]> {
    const isEmpty = Object.keys(query).length === 0;
    let repositories;

    if (isEmpty) {
      repositories = await this.repositoryRepo.find({
        relations: ['owner']
      });
    } else {
      const key = Object.keys(query)[0];
      const value = query[key];
      repositories = await this.filterRepositories(key, value);
    }

    if (!repositories.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const repositoriesWithContributionsCount = await this.attachContributionsCount(repositories);

    return repositoriesWithContributionsCount;
  }

  async findContributors(id: string): Promise<User[]> {
    const repository = await this.repositoryRepo.findOne({
      where: { id: this.parseId(id) },
      relations: [
        'contributors',
      ]
    });

    if (!repository) {
      throw new HttpException('Repository does not exist', HttpStatus.NOT_FOUND);
    }

    return repository.contributors;
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }
}
