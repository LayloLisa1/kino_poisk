import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'hashed_password',
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true, 
    field: 'hashed_refresh_token', 
  })
  hashed_refresh_token: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updatedAt: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isAdmin: boolean;

  @Column({ type: DataType.STRING })
  activation_link: string;
}
