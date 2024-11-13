import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './model/rivews.model';
import { CreateReviewDto } from './dto/create-rivew.dto';
import { UpdateReviewDto } from './dto/update-rivew.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  async findOne(id: number): Promise<Review> {
    return this.reviewModel.findByPk(id);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto){
    return this.reviewModel.update(updateReviewDto, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await review.destroy();
  }
}
export { Review };

