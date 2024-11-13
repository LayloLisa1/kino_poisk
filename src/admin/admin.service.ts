import {
  BadRequestException,
  Body,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AdminService {
  adminService: any;
  create(createAdminDto: CreateAdminDto, res: Response<any, Record<string, any>>) {
    throw new Error("Method not implemented.");
  }
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      login: admin.login,
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

  async refreshToken(id: number, refresh_token: string, res: Response) {
    try {
      console.log("Verifying refresh token...");
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      console.log("Token verified:", verified_token);
  
      if (!verified_token || id !== verified_token.id) {
        throw new UnauthorizedException("Invalid or unauthorized token");
      }
  
      const payload = { id: verified_token.id, login: verified_token.login };
      const newAccessToken = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
  
      console.log("New access token generated:", newAccessToken);
      return { access_token: newAccessToken };
    } catch (error) {
      console.error("Error during token refresh:", error);
      throw new InternalServerErrorException("Error refreshing token");
    }
  }
  

  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Res() res) {
    try {
      const newAdmin = await this.adminService.createAdmin(createAdminDto);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Admin created successfully',
        data: newAdmin,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the admin',
      });
    }
  }
  

  async findAll() {
    return this.adminModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new BadRequestException(`Admin with ID: ${id} not found`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    if (!updatedAdmin[1][0]) {
      throw new BadRequestException(`Admin with ID: ${id} not found`);
    }
    return updatedAdmin[1][0];
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      return { message: `Admin with ID: ${id} not found` };
    }
    await this.adminModel.destroy({ where: { id } });
    return { message: `Admin with ID: ${id} successfully deleted` };
  }


}
