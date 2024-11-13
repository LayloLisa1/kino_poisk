// src/genre/genre.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Genre extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}
