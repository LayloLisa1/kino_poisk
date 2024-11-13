// src/language/language.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Language extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}
