import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingService } from './ratings.service';
import { RatingController } from './ratings.controller';
import { Rating } from './model/rating.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Rating]),
    JwtModule.register({ secret: 'laylo8002', signOptions:{ expiresIn: '60s'} })
  ],
  controllers: [RatingController],
  providers: [RatingService, AdminGuard],
})
export class RatingModule {}
