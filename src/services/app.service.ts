import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from 'src/entities/repository.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(RepositoryEntity) private repositoryRepo: Repository<RepositoryEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  getHello(): string {
    return 'Hellooo, api is listening...';
  }

  async filterRepositories(key: string, value: string) {
    const queryBuilder = this.repositoryRepo.createQueryBuilder('repository');

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

  async findAllRepositories(query) {
    const isEmpty = Object.keys(query).length === 0;

    if (isEmpty) {
      return await this.repositoryRepo.find();
    } else {
      const key = Object.keys(query)[0];
      const value = query[key];

      const result = await this.filterRepositories(key, value);

      if (!result.length) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      return result;
    }
  }

  private parseId(id) {
    if (/^\d+$/.test(id)) return parseInt(id);
    throw new HttpException('Id is invalid', HttpStatus.BAD_REQUEST);
  }

  async findContributors(id: string) {
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
}
