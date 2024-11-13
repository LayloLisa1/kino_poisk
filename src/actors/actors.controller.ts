// src/actors/actors.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from './model/actor.model';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  findAll(): Promise<Actor[]> {
    return this.actorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Actor> {
    return this.actorsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateActorDto: CreateActorDto): Promise<Actor> {
    return this.actorsService.update(id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.actorsService.remove(id);
  }
}
