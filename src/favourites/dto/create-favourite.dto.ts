import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavouriteDto {
  @ApiProperty({ example: 1, description: 'ID of the user who added the movie to favorites' })
  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  userId: number;

  @ApiProperty({ example: 1, description: 'ID of the movie added to favorites' })
  @IsInt({ message: 'Movie ID must be an integer' })
  @IsNotEmpty({ message: 'Movie ID cannot be empty' })
  movieId: number;
}
