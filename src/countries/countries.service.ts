// src/country/country.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './model/country.model';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country)
    private countryModel: typeof Country,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryModel.create();
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.findAll();
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryModel.findByPk(id);
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id);
    return country.update(updateCountryDto);
  }

  async remove(id: number): Promise<void> {
    const country = await this.findOne(id);
    await country.destroy();
  }
}
