import {
  Controller,
  Post,
  Body,
  Res,
  Param,

} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { AdminSignInDto } from "src/admin/dto/signIn-admin.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth-signup')
  @ApiOperation({ summary: 'Auth Sign-Up' })
  @ApiResponse({ status: 201, description: 'Admin successfully created.' })
  async adminSignUp(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    return this.authService.adminSignUp(createAdminDto, res);
  }

  @Post('auth-signin')
  @ApiOperation({ summary: 'Auth Sign-In' })
  @ApiResponse({ status: 200, description: 'Auth successfully signed in.' })
  async adminSignIn(@Body() adminSignInDto: AdminSignInDto, @Res() res: Response) {
    return this.authService.adminSignIn(adminSignInDto, res);
  }

  @Post('auth-refreshToken/:id')
  @ApiOperation({ summary: 'Auth Refresh Token' })
  @ApiResponse({ status: 200, description: 'Token successfully refreshed.' })
  async adminRefreshToken(@Param('id') id: number, @Body() body: { refresh_token: string }, @Res() res: Response) {
    return this.authService.refreshTokenAdmin(id, body.refresh_token, res);
  }

  @Post('auth-signout/:id')
  @ApiOperation({ summary: 'Auth Sign-Out' })
  @ApiResponse({ status: 200, description: 'Auth successfully signed out.' })
  async adminSignOut(@Param('id') id: number, @Res() res: Response) {
    return this.authService.adminSignOut(id, res);
  }

  @Post('user-signup')
  @ApiOperation({ summary: 'User Sign-Up' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  async userSignUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.authService.userSignUp(createUserDto, res);
  }
}
