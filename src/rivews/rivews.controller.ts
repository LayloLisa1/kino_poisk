import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-rivew.dto';
import { UpdateReviewDto } from './dto/update-rivew.dto';
import { Review, ReviewsService } from './rivews.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new review (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Review successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create reviews.',
  })
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({
    status: 200,
    description: 'List of all reviews.',
  })
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({
    status: 200,
    description: 'Review found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Review not found.',
  })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
