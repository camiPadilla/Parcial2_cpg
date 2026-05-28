import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NivelesAcademicosModule } from './niveles_academicos/niveles_academicos.module';
import { ProgramasModule } from './programas/programas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot(),

  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
  }),

  NivelesAcademicosModule,
  ProgramasModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
