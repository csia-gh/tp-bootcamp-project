import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const port = +process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
}
bootstrap();
