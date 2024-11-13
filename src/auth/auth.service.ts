import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AdminSignInDto } from 'src/admin/dto/signIn-admin.dto';
import { MailService } from '../mail/mail.service';
import { User } from 'src/user/model/user.model';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  adminRepo: any;
  refreshToken(id: number, refresh_token: string, res: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.");
  }
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //===================== ADMIN ======================

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      login: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      is_admin: admin.is_admin,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshTokenAdmin(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
  
      if (!verified_token) {
        throw new UnauthorizedException('Unauthorized token');
      }
  
      const payload = { id: verified_token.id, login: verified_token.login };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
  
      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  

  async adminSignUp(createAdminDto: CreateAdminDto, res: Response) {
    const existingAdmin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
  
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }
  
    const hashed_password = await bcrypt.hash(createAdminDto.hashed_password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
  
    const tokens = await this.generateToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  
    await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id } },
    );
  
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
  
    return res.status(201).json({
      message: 'Admin successfully registered',
      admin: newAdmin,
    });
  }
 
  async adminSignIn(adminSignInDto: AdminSignInDto, res: Response) {
    try {
      const { email, hashed_password } = adminSignInDto;
      
      const admin = await this.adminRepo.findOne({ where: { email } });
      if (!admin) {
        throw new UnauthorizedException('Password or Email is incorrect');
      }
  
      const validPassword = await compare(hashed_password, admin.hashed_password);
      if (!validPassword) {
        throw new UnauthorizedException('Password or Email is incorrect');
      }
      const tokens = await this.adminGenerateTokens(admin);
  
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME,
      });
  
      return {
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.error('Error in adminSignIn:', error);
      throw new InternalServerErrorException('An error occurred while signing in');
    }
  }
  
  private async adminGenerateTokens(_admin: Admin): Promise<{ access_token: string; refresh_token: string }> {
    return { access_token: 'access_token', refresh_token: 'refresh_token' };
  }
  

  

  async adminSignOut(adminId: number, res: Response) {
    const admin = await this.adminModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminId } },
    );
  
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
  
    res.clearCookie('refresh_token');
    return {
      message: 'Admin successfully signed out',
    };
  }
  

  // ======================= User ========================

  async generateTokenLogin(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async userSignUp(createUserDto: CreateUserDto, res: Response) {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
  
    const hashed_password = await bcrypt.hash(createUserDto.hashed_password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
  
    const tokens = await this.generateTokenLogin(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  
    await this.userModel.update(
      { hashed_refresh_token },
      { where: { id: newUser.id } },
    );
  
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });
  
    return res.status(201).json({
      message: 'User successfully registered',
      user: newUser,
      access_token: tokens.access_token,
    });
 }
  
}
