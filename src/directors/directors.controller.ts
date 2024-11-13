import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DirectorService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Directors')
@Controller('directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new director' })
  @ApiResponse({
    status: 201,
    description: 'Director successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create a director.',
  })
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all directors' })
  @ApiResponse({
    status: 200,
    description: 'List of all directors.',
  })
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a director by ID' })
  @ApiResponse({
    status: 200,
    description: 'Director found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Director not found.',
  })
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a director by ID' })
  @ApiResponse({
    status: 200,
    description: 'Director updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Director not found.',
  })
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a director by ID' })
  @ApiResponse({
    status: 200,
    description: 'Director deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Director not found.',
  })
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }
}
