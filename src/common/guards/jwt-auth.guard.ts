import { Get, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    @Get()
    @UseGuards(JwtAuthGuard)
    getAdminData() {
      return { message: 'Protected route' };
    }
  }






