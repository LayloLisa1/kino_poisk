import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavouriteService } from './favourites.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Favourites')
@Controller('favourites')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new favourite item' })
  @ApiResponse({
    status: 201,
    description: 'Favourite item successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create a favourite item.',
  })
  create(@Body() createFavouriteDto: CreateFavouriteDto) {
    return this.favouriteService.create();
  }

  @Get()
  @ApiOperation({ summary: 'Get all favourite items' })
  @ApiResponse({
    status: 200,
    description: 'List of all favourite items.',
  })
  findAll() {
    return this.favouriteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a favourite item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Favourite item found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Favourite item not found.',
  })
  findOne(@Param('id') id: string) {
    return this.favouriteService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a favourite item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Favourite item updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Favourite item not found.',
  })
  update(@Param('id') id: string, @Body() updateFavouriteDto: UpdateFavouriteDto) {
    return this.favouriteService.update(+id, updateFavouriteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a favourite item by ID' })
  @ApiResponse({
    status: 200,
    description: 'Favourite item deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Favourite item not found.',
  })
  remove(@Param('id') id: string) {
    return this.favouriteService.remove(+id);
  }
}
