// src/movie/movie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './model/movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    return movie.update(updateMovieDto);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await movie.destroy();
  }
}
