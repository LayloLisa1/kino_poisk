import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDateString, IsNumber, IsBoolean, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception', description: 'Title of the movie' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ example: '2010-07-16', description: 'Release date of the movie' })
  @IsDateString({}, { message: 'Release date must be a valid date string (YYYY-MM-DD)' })
  releaseDate: Date;

  @ApiProperty({ example: 'A mind-bending thriller about dreams within dreams.', description: 'Description of the movie' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ example: 148, description: 'Duration of the movie in minutes' })
  @IsInt({ message: 'Duration must be an integer' })
  @Min(1, { message: 'Duration must be greater than 0' })
  duration: number;

  @ApiProperty({ example: 8.8, description: 'Rating of the movie (from 1 to 10)' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating cannot be greater than 10' })
  rating: number;

  @ApiProperty({ example: 1, description: 'Country ID related to the movie' })
  @IsInt({ message: 'Country ID must be an integer' })
  countriesId: number;

  @ApiProperty({ example: 2010, description: 'Release year of the movie' })
  @IsInt({ message: 'Release year must be an integer' })
  releaseYear: number;

  @ApiProperty({ example: 1, description: 'Genre ID related to the movie' })
  @IsInt({ message: 'Genre ID must be an integer' })
  genresId: number;

  @ApiProperty({ example: 'inception.jpg', description: 'Image URL of the movie' })
  @IsString({ message: 'Image must be a string' })
  @IsNotEmpty({ message: 'Image URL cannot be empty' })
  image: string;

  @ApiProperty({ example: true, description: 'Action flag for movie' })
  @IsOptional()
  @IsBoolean({ message: 'Action must be a boolean' })
  action?: boolean;
}
