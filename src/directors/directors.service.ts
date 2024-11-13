import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Director } from './model/director.model';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(@InjectModel(Director) private directorModel: typeof Director) {}

  async create(createDirectorDto: CreateDirectorDto): Promise<Director> {
    return this.directorModel.create(createDirectorDto);
  }

  async findAll(): Promise<Director[]> {
    return this.directorModel.findAll();
  }

  async findOne(id: number): Promise<Director> {
    const director = await this.directorModel.findByPk(id);
    if (!director) {
      throw new NotFoundException(`Director with ID ${id} not found`);
    }
    return director;
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const director = await this.findOne(id);
    return director.update(updateDirectorDto);
  }

  async remove(id: number): Promise<void> {
    const director = await this.findOne(id);
    await director.destroy();
  }
}
