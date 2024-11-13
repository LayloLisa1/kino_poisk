import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryService } from './countries.service';
import { CountryController } from './countries.controller';
import { Country } from './model/country.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';
@Module({
  imports: [SequelizeModule.forFeature([Country]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })],
  controllers: [CountryController],
  providers: [CountryService, AdminGuard],
})
export class CountryModule {}
