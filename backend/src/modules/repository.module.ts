import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from '../entities/repository.entity';
import { User } from '../entities/user.entity';
import { RepositoryService } from '../services/repository.service';
import { RepositoryController } from '../controllers/repository.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity, User])],
  providers: [RepositoryService],
  controllers: [RepositoryController],
  exports: [RepositoryService],
})
export class RepositoryModule {}
