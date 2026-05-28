import { Injectable } from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramasService {
  constructor(@InjectRepository(Programa) private programaRepository: Repository<Programa>) {}
  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    const programa = this.programaRepository.create(createProgramaDto);
    return this.programaRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return this.programaRepository.find({ relations:{nivelAcademico:true} });
  }

  async findOne(id: number): Promise<Programa | null> {
    return await this.programaRepository.findOneBy({ id });
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa | null> {
    const programa = await this.findOne(id);
    if (!programa) {
      return null;
    }
    await this.programaRepository.update(id, updateProgramaDto);
    return await this.programaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Programa | null> {
    const programa = await this.findOne(id);
    if (!programa) {
      return null;
    }
    return await this.programaRepository.softRemove(programa);
  }
}
