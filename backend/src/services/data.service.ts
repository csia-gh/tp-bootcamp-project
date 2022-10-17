import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RepositoryEntity } from 'src/entities/repository.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DataService {
  private apiUrl = 'https://api.github.com/orgs/facebook/repos';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly connection: DataSource,
    @InjectRepository(RepositoryEntity)
    private repositoryRepo: Repository<RepositoryEntity>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async makeRequest(url = this.apiUrl, method = 'GET', data = {}) {
    const res = await this.httpService.axiosRef.get(url, {
      method,
      headers: {
        Authorization: `Token ${this.configService.get('GITHUB_ACCESS_TOKEN')}`,
      },
      data,
    });

    return res.data;
  }

  async saveRepositories(repositories) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.repositoryRepo.save(repositories);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.error(error);
      throw new HttpException(
        'Error while saving repositories',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getRepositories() {
    let repositoriesData;

    try {
      repositoriesData = await this.makeRequest();
    } catch (error) {
      // log...
      throw new HttpException(
        'Unable to get repositories',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const repositories = await this.collectRepositories(repositoriesData);

    return repositories;
  }

  async collectRepositories(repositoriesData) {
    const repositories = await Promise.all(
      repositoriesData.map(async (repositoryData) => {
        const owner = this.createUser(repositoryData.owner);

        const contributors = await this.getContributors(repositoryData);

        return this.repositoryRepo.create({
          id: repositoryData.id,
          owner,
          full_name: repositoryData.full_name,
          description: repositoryData.description,
          html_url: repositoryData.html_url,
          language: repositoryData.language,
          stargazers_count: repositoryData.stargazers_count,
          contributors: contributors,
        });
      }),
    );

    return repositories;
  }

  async getContributors(repositoryData) {
    let contributorsData;

    try {
      contributorsData = await this.makeRequest(
        repositoryData.contributors_url,
      );
    } catch (error) {
      // log...
      throw new HttpException(
        'Unable to get contributors',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return contributorsData.map((contributorData) =>
      this.createUser(contributorData),
    );
  }

  createUser(data) {
    return this.userRepo.create({
      id: data.id,
      login: data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      type: data.type,
    });
  }

  async syncDB() {
    const repositories = await this.getRepositories();

    await this.saveRepositories(repositories);

    return 'sync complete';
  }
}
