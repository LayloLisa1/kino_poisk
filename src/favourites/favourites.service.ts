// src/favourite/favourite.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favourite } from './model/favourite.model';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(Favourite)
    private favouriteModel: typeof Favourite,
  ) {}

  async create(): Promise<Favourite> {
    return this.favouriteModel.create();
  }

  async findAll(): Promise<Favourite[]> {
    return this.favouriteModel.findAll();
  }

  async findOne(id: number): Promise<Favourite> {
    const favourite = await this.favouriteModel.findByPk(id);
    if (!favourite) {
      throw new NotFoundException('Favourite not found');
    }
    return favourite;
  }

  async update(id: number, updateFavouriteDto: UpdateFavouriteDto): Promise<Favourite> {
    const favourite = await this.findOne(id);
    return favourite.update(updateFavouriteDto);
  }

  async remove(id: number): Promise<void> {
    const favourite = await this.findOne(id);
    await favourite.destroy();
  }
}
