import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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
}
