// src/language/language.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Language } from './model/language.model';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language)
    private languageModel: typeof Language,
  ) {}

  async create(createLanguageDto?: CreateLanguageDto): Promise<Language> {
    return this.languageModel.create();
  }

  async findAll(): Promise<Language[]> {
    return this.languageModel.findAll();
  }

  async findOne(id: number): Promise<Language> {
    const language = await this.languageModel.findByPk(id);
    if (!language) {
      throw new NotFoundException('Language not found');
    }
    return language;
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    const language = await this.findOne(id);
    return language.update(updateLanguageDto);
  }

  async remove(id: number): Promise<void> {
    const language = await this.findOne(id);
    await language.destroy();
  }
}
