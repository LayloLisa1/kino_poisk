// src/ratings/rating.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './model/rating.model';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating)
    private ratingModel: typeof Rating,
  ) {}

  async create(): Promise<Rating>{
    return this.ratingModel.create();
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingModel.findAll();
  }

  async findOne(id: number): Promise<Rating> {
    const rating = await this.ratingModel.findByPk(id);
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.findOne(id);
    return rating.update(updateRatingDto);
  }

  async remove(id: number): Promise<void> {
    const rating = await this.findOne(id);
    await rating.destroy();
  }
}
