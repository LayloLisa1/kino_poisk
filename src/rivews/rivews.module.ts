import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt'; 
import { ReviewController } from './rivews.controller';
import { ReviewsService } from './rivews.service';
import { Review } from './model/rivews.model';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Review]), 
    JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } }),
  ],
  controllers: [ReviewController],
  providers: [ReviewsService, AdminGuard], 
})
export class ReviewsModule {}
