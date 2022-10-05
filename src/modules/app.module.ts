import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RepositoryEntity } from '../entities/repository.entity';
import { User } from '../entities/user.entity';
import { ormConfig } from '../config/ormconfig';
import config from '../config/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DataModule } from './data.module';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register({
      options: { ttl: 300 },
      isGlobal: true,
      store: redisStore,
      host: config.redis_host,
      port: config.redis_port,
    }),
    TypeOrmModule.forRoot(ormConfig), TypeOrmModule.forFeature([User, RepositoryEntity]), DataModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
