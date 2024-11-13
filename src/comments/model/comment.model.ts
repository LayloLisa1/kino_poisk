import { Table, Column, Model, ForeignKey, DataType, CreatedAt } from 'sequelize-typescript';
import { User } from 'src/user/model/user.model';
import { Review } from 'src/rivews/model/rivews.model';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: bigint;

  @ForeignKey(() => Review)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  review_id: bigint;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: bigint;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment_text: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;
}
