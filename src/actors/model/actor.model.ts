// src/actors/actor.model.ts
import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Movie } from 'src/movies/model/movie.model';

@Table({ tableName: 'actors' })
export class Actor extends Model<Actor> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday: Date;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.BIGINT,
  })
  movieId: number;

  @BelongsTo(() => Movie)
  movie: Movie;
}
