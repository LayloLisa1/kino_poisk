import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDirectorDto {
  @ApiProperty({ example: 'Christopher Nolan', description: 'Director name' })
  @IsString({ message: 'Director name must be a string' })
  @IsNotEmpty({ message: 'Director name cannot be empty' })
  name: string;

  @ApiProperty({ example: 'Director biography', description: 'Director bio', required: false })
  @IsOptional()
  @IsString({ message: 'Biography must be a string' })
  bio?: string;

  @ApiProperty({ example: 1, description: 'Related movie ID', required: false })
  @IsOptional()
  @IsInt({ message: 'Movie ID must be an integer' })
  movie_id?: number;
}
