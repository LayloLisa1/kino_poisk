import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './model/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentModel.create(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll();
  }

  async findOne(id: bigint): Promise<Comment> {
    return this.commentModel.findByPk(id);
  }

  async update(id: bigint, updateCommentDto: CreateCommentDto): Promise<[number, Comment[]]> {
    return this.commentModel.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: bigint): Promise<void> {
    const comment = await this.findOne(id);
    await comment.destroy();
  }
}
