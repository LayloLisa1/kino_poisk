import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) {
      throw new Error('Email already in use');
    }
    const hashed_password = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      ...createUserDto,
      hashed_password,
    });

    return {
      message: 'User registered successfully',
      user: newUser,
    };
  }
}
