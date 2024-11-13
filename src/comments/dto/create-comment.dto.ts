import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 1, description: 'ID of the review this comment is associated with' })
  @IsInt({ message: 'Review ID must be an integer' })
  review_id: bigint;

  @ApiProperty({ example: 1, description: 'ID of the user who made the comment' })
  @IsInt({ message: 'User ID must be an integer' })
  user_id: bigint;

  @ApiProperty({ example: 'This is a great review!', description: 'Text content of the comment' })
  @IsString({ message: 'Comment text must be a string' })
  @IsNotEmpty({ message: 'Comment text cannot be empty' })
  comment_text: string;
}
