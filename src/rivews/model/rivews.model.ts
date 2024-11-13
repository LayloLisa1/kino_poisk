import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Movie } from 'src/movies/model/movie.model';

@Table
export class Review extends Model<Review> {
  @Column
  @ForeignKey(() => User)
  user_id: number;

  @Column
  @ForeignKey(() => Movie)
  movie_id: number;

  @Column
  review_text: string;

  @Column
  created_at: Date;

  // Agar siz yana boshqa maydonlar qo'shmoqchi bo'lsangiz, ularni bu yerda qo'shishingiz mumkin.
}
