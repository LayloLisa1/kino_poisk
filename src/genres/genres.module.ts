import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenreService } from './genres.service';
import { GenreController } from './genres.controller';
import { Genre } from './model/genre.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [SequelizeModule.forFeature([Genre]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })],
  controllers: [GenreController],
  providers: [GenreService, AdminGuard],
})
export class GenreModule {}
