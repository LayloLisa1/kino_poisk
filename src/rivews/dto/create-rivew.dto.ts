import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  movie_id: number;

  @IsNotEmpty()
  review_text: string;

  created_at: Date; // Yaratilgan vaqtni avtomatik belgilash mumkin
}
