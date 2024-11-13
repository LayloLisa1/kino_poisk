// src/movie/movie.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Genre } from 'src/genres/model/genre.model';
import { Country } from 'src/countries/model/country.model';

@Table
export class Movie extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  releaseDate: Date;

  @Column
  description: string;

  @Column
  duration: number;

  @Column
  rating: number;

  // @ForeignKey(() => Country)
  // @Column
  // countriesId: number;

  @Column
  releaseYear: number;

  // @ForeignKey(() => Genre)
  // @Column
  // genresId: number;

  @Column
  image: string;

  @Column({ defaultValue: false })
  action: boolean;
}
