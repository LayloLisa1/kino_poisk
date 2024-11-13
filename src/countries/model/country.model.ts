// src/country/country.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Country extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}
