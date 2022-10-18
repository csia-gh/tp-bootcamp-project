import { Test } from '@nestjs/testing';
import { RepositoryService } from '../services/repository.service';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/common';
import { RepositoryResponse } from '../types/RepositoryResponse';

describe('UserController', () => {
  let userController: UserController;
  let fakeUserService: Partial<UserService>;
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
  ];

  const fakeContributions = [{ id: 1, owner: fakeUsers[0] }];

  beforeEach(async () => {
    fakeUserService = {
      findUsers: jest.fn(() => Promise.resolve(fakeUsers as User[])),
    };

    fakeRepositoryService = {
      findContributions: jest.fn((username: string) =>
        Promise.resolve(fakeContributions as RepositoryResponse[]),
      ),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
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

    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('findUsers should be called', async () => {
    const users = await userController.findUsers({});
    expect(users.length).toEqual(fakeUsers.length);
    expect(users[0].login).toEqual(fakeUsers[0].login);
  });

  it('findContributions should be called', async () => {
    const contributions = await userController.findContributions('anystring');
    expect(contributions.length).toEqual(fakeContributions.length);
    expect(contributions[0].owner.id).toEqual(fakeUsers[0].id);
  });
});
