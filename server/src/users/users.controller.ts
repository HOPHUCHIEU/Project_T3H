/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // ----------- Public -----------
  // Đăng ký tài khoản mới (public)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Đăng nhập user (public)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  // ----------- Profile User tự xem & sửa -----------
  // PHẢI ĐỂ TRƯỚC các endpoint :id !!
  // Xem profile của chính mình
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  // Sửa thông tin cá nhân của mình
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  // ----------- Chỉ ADMIN -----------
  // Tạo user mới (admin tạo tài khoản)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async adminCreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Lấy danh sách tất cả user (admin)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  // Lấy thông tin user theo id (admin)
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Admin cập nhật thông tin user
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Admin xóa user
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
