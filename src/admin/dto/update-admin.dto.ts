import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
 
    @ApiProperty({
        description: "Adminning to'liq ismi",
        example: "Islomov Islom",
      })
      @IsString({ message: 'Full name must be a string' })
      @Length(3, 50, { message: 'Full name length must be between 3 and 50 characters' })
      full_name: string;
    
      @ApiProperty({
        description: "Admin login (3 to 20 characters)",
        example: "admin123",
      })
      @IsString({ message: 'Login must be a string' })
      @Length(3, 20, { message: 'Login length must be between 3 and 20 characters' })
      login: string;
    
      @ApiProperty({
        description: "Adminning email manzili",
        example: "admin@example.com",
      })
      @IsEmail({}, { message: 'Email must be a valid email address' })
      @IsNotEmpty({ message: 'Email is required' })
      email: string;
    
      @ApiProperty({
        description: 'Admin password (at least 6 characters)',
        example: 'password123',
      })
      @IsString({ message: 'Password must be a string' })
      @MinLength(6, { message: 'Password must be at least 6 characters long' })
      hashed_password: string;
    
      @ApiProperty({
        description: 'Confirm password (must match password)',
        example: 'password123',
      })
      @IsString({ message: 'Confirm password must be a string' })
      confirm_password: string;
    
      @ApiProperty({
        description: 'Is the admin account active?',
        example: true,
        required: false,
      })
      @IsOptional()
      @IsBoolean({ message: 'is_active must be a boolean' })
      is_active?: boolean;
    
      @ApiProperty({
        description: "Is this admin the creator of the system?",
        default: false,
        required: false,
      })
      @IsOptional()
      @IsBoolean({ message: 'is_creator must be a boolean' })
      is_creator?: boolean;
}
