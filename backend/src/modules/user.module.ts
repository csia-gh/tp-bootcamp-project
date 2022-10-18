import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from '../entities/repository.entity';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { RepositoryService } from '../services/repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity, User])],
  providers: [UserService, RepositoryService],
  controllers: [UserController],
})
export class UserModule {}
