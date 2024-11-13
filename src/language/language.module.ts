import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Language } from './model/language.model';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [SequelizeModule.forFeature([Language]),
  JwtModule.register({ secret: 'laylo8002', signOptions: { expiresIn: '60s' } })
],
  controllers: [LanguageController],
  providers: [LanguageService,AdminGuard],
})
export class LanguageModule {}
