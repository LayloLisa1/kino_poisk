// src/actors/actors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Actor } from './model/actor.model';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(Actor)
    private readonly actorModel: typeof Actor,
  ) {}

  create(createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorModel.create(createActorDto);
  }

  findAll(): Promise<Actor[]> {
    return this.actorModel.findAll();
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorModel.findByPk(id);
    if (!actor) {
      throw new NotFoundException('Actor not found');
    }
    return actor;
  }

  async update(id: number, updateActorDto: CreateActorDto): Promise<Actor> {
    const actor = await this.findOne(id);
    await actor.update(updateActorDto);
    return actor;
  }

  async remove(id: number): Promise<void> {
    const actor = await this.findOne(id);
    await actor.destroy();
  }
}
