import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../config/ormconfig';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: ormConfig.host,
    port: Number(ormConfig.port),
    username: ormConfig.username,
    password: ormConfig.password,
    migrations: ormConfig.migrations,
    entities: ormConfig.entities,
    synchronize: false,
    database: ormConfig.database,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
