// src/actors/actors.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from './model/actor.model';

@Module({
  imports: [SequelizeModule.forFeature([Actor])],
  providers: [ActorsService],
  controllers: [ActorsController],
})
export class ActorsModule {}
