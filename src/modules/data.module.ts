import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DataService } from '../services//data.service';
import { DataController } from '../controllers/data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from 'src/entities/repository.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([RepositoryEntity, User])],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule { }
