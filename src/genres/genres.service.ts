// src/genre/genre.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './model/genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre)
    private genreModel: typeof Genre,
  ) {}

  async create(createGenreDto?: CreateGenreDto): Promise<Genre> {
    return this.genreModel.create();
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.findAll();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreModel.findByPk(id);
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);
    return genre.update(updateGenreDto);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    await genre.destroy();
  }
}
