import { Test } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectLiteral } from 'typeorm';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const fakeUsers = [
    { id: 1, login: 'user1' },
    { id: 2, login: 'user2' },
  ];

  const mockUserRepo = {
    createQueryBuilder: jest.fn((entityName) => ({
      getMany: jest.fn(() => fakeUsers),
      where: jest.fn((where: string, parameters?: ObjectLiteral) => ({
        getMany: () =>
          Promise.resolve(
            fakeUsers.filter((fakeUser) =>
              fakeUser.login.includes(parameters.name.slice(1, -1)),
            ),
          ),
      })),
    })),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('can create an instance of user service', async () => {
    expect(service).toBeDefined();
  });

  describe('findUsers', () => {
    it('should return all the users', async () => {
      const users = await service.findUsers({});
      expect(users.length).toEqual(fakeUsers.length);
      expect(users[0].id).toEqual(fakeUsers[0].id);
    });

    it('should return filtered users (users.length should be 1)', async () => {
      const users = await service.findUsers({ name: fakeUsers[0].login });
      expect(users.length).toEqual(1);
    });

    it('should return filtered users (users[0].login should be fakeUsers[0].login)', async () => {
      const users = await service.findUsers({ name: fakeUsers[0].login });
      expect(users[0].login).toEqual(fakeUsers[0].login);
    });

    it('should return NOT_FOUND exception', async () => {
      expect.assertions(3);

      try {
        await service.findUsers({ name: 'doesNotExist' });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('No users found');
        expect(error.status).toBe(404);
      }
    });
  });
});
