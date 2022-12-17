import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryService } from '../services/repository.service';
import { RepositoryEntity } from '../entities/repository.entity';
import { HttpException } from '@nestjs/common';

describe('RepositoryService', () => {
  let service: RepositoryService;

  const fakeUsers = [
    { id: 1, login: 'user1' },
    { id: 2, login: 'user2' },
  ];

  const fakeRepositories = [
    {
      id: 455600,
      full_name: 'hhvm',
      description: 'A virtual machine for executing programs written in Hack.',
      html_url: 'https://github.com/facebook/hhvm',
      language: 'C++',
      stargazers_count: 17435,
      owner: fakeUsers[0],
      contributors: [],
    },
    {
      id: 565426,
      full_name: 'pyre2',
      description: 'Python wrapper for RE2',
      html_url: 'https://github.com/facebook/pyre2',
      language: 'C++',
      stargazers_count: 606,
      owner: fakeUsers[1],
      contributors: [...fakeUsers],
    },
  ] as RepositoryEntity[];

  const mockUserRepo = {};

  const mockRepositoryRepo = {
    findOne: jest.fn(({ where }) =>
      Promise.resolve(
        fakeRepositories.filter((fakeRepo) => fakeRepo.id === where.id)[0],
      ),
    ),
    find: jest.fn(() => fakeRepositories),
    createQueryBuilder: jest.fn(() => ({
      repoName: '',
      where(where, params) {
        this.repoName = params['name'];
        return {};
      },
      leftJoinAndSelect() {
        return {
          leftJoinAndSelect: () => {
            return {
              getMany: () =>
                fakeRepositories.filter((fakeRepo) =>
                  fakeRepo.full_name.includes(this.repoName.slice(1, -1)),
                ),
            };
          },
        };
      },
    })),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RepositoryService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
        {
          provide: getRepositoryToken(RepositoryEntity),
          useValue: mockRepositoryRepo,
        },
      ],
    }).compile();

    service = module.get(RepositoryService);
  });

  it('can create an instance of user service', async () => {
    expect(service).toBeDefined();
  });

  describe('findRepositories', () => {
    it('should return the list of all repositories (repositories.length should be equal to fakeRepositories.length)', async () => {
      const repositories = await service.findRepositories({});
      expect(repositories.length).toEqual(fakeRepositories.length);
    });

    it('should return the list of all repositories (repositories[0].id should be the same as fakeRepositories[0].id)', async () => {
      const repositories = await service.findRepositories({});
      expect(repositories[0].id).toBe(fakeRepositories[0].id);
    });

    it('should return the filtered list of repositories', async () => {
      const repoName = 'hhvm';
      const repos = await service.findRepositories({ name: repoName });
      expect(repos.length).toEqual(1);
    });

    it('should throw NOT_FOUND exception', async () => {
      expect.assertions(2);

      try {
        await service.findRepositories({ name: 'doesNotExist' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
      }
    });
  });

  describe('findContributors', () => {
    it('should return all of the users who contributed to the given repository)', async () => {
      const repoId = fakeRepositories[1].id;
      const contributors = await service.findContributors(repoId);
      expect(contributors.length).toEqual(fakeRepositories.length);
    });

    it('should throw NOT_FOUND exception', async () => {
      expect.assertions(2);

      try {
        await service.findContributors(-123123);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
      }
    });
  });
});
