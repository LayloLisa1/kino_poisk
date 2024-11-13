import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenreService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'Genre successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create genres.',
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({
    status: 200,
    description: 'List of all genres.',
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Genre found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Genre updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Genre deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Genre not found.',
  })
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
