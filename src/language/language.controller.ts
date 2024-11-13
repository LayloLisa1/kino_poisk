import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth() // Protect routes with JWT authentication
@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new language' })
  @ApiResponse({
    status: 201,
    description: 'Language successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create languages.',
  })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({
    status: 200,
    description: 'List of all languages.',
  })
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language by ID' })
  @ApiResponse({
    status: 200,
    description: 'Language found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Language not found.',
  })
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a language by ID' })
  @ApiResponse({
    status: 200,
    description: 'Language updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Language not found.',
  })
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language by ID' })
  @ApiResponse({
    status: 200,
    description: 'Language deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Language not found.',
  })
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
