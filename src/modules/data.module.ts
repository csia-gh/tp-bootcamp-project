import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DataService } from '../services//data.service';
import { DataController } from '../controllers/data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([])],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule { }
