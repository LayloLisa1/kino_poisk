// src/ratings/rating.model.ts
import { Column, Model, Table, ForeignKey, CreatedAt } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Movie } from 'src/movies/model/movie.model';

@Table
export class Rating extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @Column({
    type: 'DECIMAL(2,1)',
    validate: { min: 0, max: 10 },
  })
  score: number;

  @CreatedAt
  @Column
  createdAt: Date;
}
