import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule } from 'node_modules/@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from 'node_modules/@nestjs/swagger/dist/document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({type: VersioningType.URI, defaultVersion: '1'});
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API REST Parcial2_cpg SIS257')
    .setDescription('Segundo parcial de SIS257')
    .setVersion('1.0')
    .addTag('niveles_academicos, programas')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
