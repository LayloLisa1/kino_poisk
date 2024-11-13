import { IsString, IsNotEmpty } from 'class-validator';

export class AdminSignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hashed_password: string;
}
