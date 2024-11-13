import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RatingService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Ratings')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new rating (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Rating successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create ratings.',
  })
  create() {
    return this.ratingService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Get all ratings' })
  @ApiResponse({
    status: 200,
    description: 'List of all ratings.',
  })
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rating by ID' })
  @ApiResponse({
    status: 200,
    description: 'Rating found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Rating not found.',
  })
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a rating by ID' })
  @ApiResponse({
    status: 200,
    description: 'Rating updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Rating not found.',
  })
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rating by ID' })
  @ApiResponse({
    status: 200,
    description: 'Rating deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Rating not found.',
  })
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
