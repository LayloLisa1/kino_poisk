import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  review_text?: string;

  // Agar siz yana boshqa maydonlar uchun yangilanishlar kiritmoqchi bo'lsangiz, ularni qo'shing.
}
