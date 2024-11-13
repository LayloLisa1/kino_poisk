import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({ example: 1, description: 'Movie ID' })
  @IsInt({ message: 'Movie ID must be an integer' })
  movie_id: number;

  @ApiProperty({ example: 'Leonardo', description: 'Actor first name' })
  @IsString({ message: 'First name must be a string' })
  firstname: string;

  @ApiProperty({ example: 'DiCaprio', description: 'Actor last name' })
  @IsString({ message: 'Last name must be a string' })
  lastname: string;

  @ApiProperty({ example: '1974-11-11', description: 'Actor birthday', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'Birthday must be a valid date string (YYYY-MM-DD)' })
  birthday_at?: Date;
}
