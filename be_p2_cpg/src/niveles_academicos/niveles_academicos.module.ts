import { Module } from '@nestjs/common';
import { NivelesAcademicosService } from './niveles_academicos.service';
import { NivelesAcademicosController } from './niveles_academicos.controller';
import { NivelesAcademico } from './entities/niveles_academico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([NivelesAcademico])],
  controllers: [NivelesAcademicosController],
  providers: [NivelesAcademicosService],
})
export class NivelesAcademicosModule {}
