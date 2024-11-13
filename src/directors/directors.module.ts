import { Module } from '@nestjs/common';
import { DirectorService } from './directors.service';
import { DirectorController } from './directors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Director } from './model/director.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';
@Module({
  imports: [SequelizeModule.forFeature([Director]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })],
  controllers: [DirectorController],
  providers: [DirectorService, AdminGuard],
})
export class DirectorModule {}
