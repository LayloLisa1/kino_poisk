import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ example: 'Action', description: 'Name of the genre' })
  @IsString({ message: 'Genre name must be a string' })
  @IsNotEmpty({ message: 'Genre name cannot be empty' })
  name: string;
}
