import { Test } from '@nestjs/testing';
import { RepositoryService } from '../services/repository.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { RepositoryController } from '../controllers/repository.controller';
import { RepositoryResponse } from '../types/RepositoryResponse';
import { User } from '../entities/user.entity';

describe('RepositoryController', () => {
  let repositoryController: RepositoryController;
  let fakeRepositoryService: Partial<RepositoryService>;

  const mockCashManager = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
  };

  const fakeUsers = [
    { id: 1, login: 'user1' },
    { id: 2, login: 'user2' },
  ] as User[];

  const fakeRepos = [{ id: 1, owner: fakeUsers[0] }];

  beforeEach(async () => {
    fakeRepositoryService = {
      findRepositories: jest.fn((query) =>
        Promise.resolve(fakeRepos as RepositoryResponse[]),
      ),
      findContributors: jest.fn((id: number) => Promise.resolve(fakeUsers)),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [RepositoryController],
      providers: [
        {
          provide: RepositoryService,
          useValue: fakeRepositoryService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCashManager,
        },
      ],
    }).compile();

    repositoryController =
      moduleRef.get<RepositoryController>(RepositoryController);
  });

  it('should be defined', () => {
    expect(repositoryController).toBeDefined();
  });

  it('findRepositories should be called', async () => {
    const repos = await repositoryController.findRepositories({});
    expect(repos.length).toEqual(fakeRepos.length);
    expect(repos[0].owner.id).toEqual(fakeUsers[0].id);
  });

  it('findContributors should be called', async () => {
    const contributors = await repositoryController.findContributors(1);
    expect(contributors.length).toEqual(fakeUsers.length);
    expect(contributors[0].id).toEqual(fakeUsers[0].id);
  });
});
