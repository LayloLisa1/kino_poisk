// src/favourite/favourite.model.ts
import { Column, Model, Table, ForeignKey, CreatedAt } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Movie } from 'src/movies/model/movie.model';

@Table
export class Favourite extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @CreatedAt
  @Column
  createdAt: Date;
}
