import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'directors' })
export class Director extends Model<Director> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  movie_id: number;
}
