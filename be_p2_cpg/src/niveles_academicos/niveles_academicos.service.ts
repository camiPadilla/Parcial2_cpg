import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelesAcademicoDto } from './dto/create-niveles_academico.dto';
import { UpdateNivelesAcademicoDto } from './dto/update-niveles_academico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelesAcademico } from './entities/niveles_academico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelesAcademicosService {
  constructor(@InjectRepository(NivelesAcademico) private  nivelesAcademicoRepository: Repository<NivelesAcademico>) {}
  async create(createNivelesAcademicoDto: CreateNivelesAcademicoDto) : Promise<NivelesAcademico> {
    let nivelesAcademico = await this.nivelesAcademicoRepository.create(createNivelesAcademicoDto);
    return await this.nivelesAcademicoRepository.save(nivelesAcademico);
  }

  async findAll() :Promise<NivelesAcademico[]> {
    return await this.nivelesAcademicoRepository.find();
  }

  async findOne(id: number) : Promise<NivelesAcademico | null> {
    return await this.nivelesAcademicoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNivelesAcademicoDto: UpdateNivelesAcademicoDto) : Promise<NivelesAcademico | null> {
    const nivelAcademico = await this.findOne(id);
    if(nivelAcademico == null){
      throw new NotFoundException(`Nivel academico con id ${id} no encontrado`)
    }
    await this.nivelesAcademicoRepository.update(id, updateNivelesAcademicoDto);
    return await this.nivelesAcademicoRepository.findOne({ where: { id } });
  }

  async remove(id: number) : Promise<NivelesAcademico | null> {
    const nivelAcademico = await this.findOne(id);
    if(nivelAcademico == null){
      return null;
    }
    return await this.nivelesAcademicoRepository.softRemove(nivelAcademico);
  }
}
