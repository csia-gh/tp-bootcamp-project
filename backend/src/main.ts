import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));


  app.setGlobalPrefix('api/v1');

  // Swagger setup starts
  const config = new DocumentBuilder()
    .setTitle('Tappointment Bootcamp Project API')
    .setDescription('All endpoints of the api and description of their usage.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  // Swagger setup ends

  const port = +process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
  });
}
bootstrap();
