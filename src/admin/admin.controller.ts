import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Response,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Admin } from './models/admin.model';

@ApiTags('Admin') // Swagger group tag for Admin endpoints
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: 'Admin created successfully', type: Admin })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createAdminDto: CreateAdminDto, @Response() res) {
     return this.adminService.createAdmin(createAdminDto, res);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'List of all admins', type: [Admin] })
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({ status: 200, description: 'Admin found', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async findOne(@Param('id') id: number) {
    return this.adminService.findOne(id);
  }

  @Post('refreshToken/:id')
  @ApiOperation({ summary: 'Refresh token for admin' })
  @ApiResponse({ status: 200, description: 'New access token generated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async refreshToken(
    @Param('id') id: number,
    @Body() { refresh_token }: { refresh_token: string },
    @Response() res,
  ) {
    const newToken = await this.adminService.refreshToken(id, refresh_token, res);
    return newToken;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin details' })
  @ApiResponse({ status: 200, description: 'Admin updated', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an admin' })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully' })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async remove(@Param('id') id: number) {
    return this.adminService.remove(id);
  }

  // @Post('/create')
  // @ApiOperation({ summary: 'Create a new admin' })
  // @ApiResponse({ status: 200, description: 'Admin created successfully' })
  // @ApiResponse({ status: 404, description: 'Admin could not be created' })
  // async createAdmin(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.createAdmin(createAdminDto);
  // }
}
