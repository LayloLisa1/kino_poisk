import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CountryService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiTags('Countries')
@ApiBearerAuth() // Protect routes with JWT authentication
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({
    status: 201,
    description: 'Country successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create a country.',
  })
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'List of all countries.',
  })
  async findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'Country found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found.',
  })
  async findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'Country updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found.',
  })
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'Country deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Country not found.',
  })
  async remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
