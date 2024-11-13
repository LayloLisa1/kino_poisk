import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 1, description: 'ID of the user who rated the movie' })
  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  userId: number;

  @ApiProperty({ example: 1, description: 'ID of the movie being rated' })
  @IsInt({ message: 'Movie ID must be an integer' })
  @IsNotEmpty({ message: 'Movie ID cannot be empty' })
  movieId: number;

  @ApiProperty({ example: 8.5, description: 'Rating score given by the user' })
  @IsNumber({}, { message: 'Score must be a number' })
  @Min(1, { message: 'Score must be at least 1' })
  @Max(10, { message: 'Score cannot be greater than 10' })
  score: number;
}
