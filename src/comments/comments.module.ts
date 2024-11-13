import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './model/comment.model';
import { User } from 'src/user/model/user.model';
import { Review } from 'src/rivews/model/rivews.model';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [SequelizeModule.forFeature([Comment, User, Review]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })],
  controllers: [CommentsController],
  providers: [CommentsService, AdminGuard],
})
export class CommentsModule {}
