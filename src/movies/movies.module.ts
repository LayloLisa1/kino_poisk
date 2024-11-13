import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieService } from './movies.service';
import { MovieController } from './movies.controller';
import { Movie } from './model/movie.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [SequelizeModule.forFeature([Movie]),
  JwtModule.register({ secret: 'laylo8002', signOptions:{ expiresIn: '60s'}})],
  controllers: [MovieController],
  providers: [MovieService, AdminGuard],
})
export class MovieModule {}
