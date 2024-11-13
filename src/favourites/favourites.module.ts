import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FavouriteService } from './favourites.service';
import { FavouriteController } from './favourites.controller';
import { Favourite } from './model/favourite.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';
@Module({
  imports: [SequelizeModule.forFeature([Favourite]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })],
  controllers: [FavouriteController],
  providers: [FavouriteService, AdminGuard],
})
export class FavouriteModule {}
