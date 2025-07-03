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

  // Đăng ký tài khoản mới - PUBLIC (người dùng tự đăng ký)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Đăng ký (tạo user) chỉ dành cho ADMIN
  @Post('admin-create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async adminCreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Đăng nhập user
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  // Lấy danh sách tất cả user (chỉ Admin)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  // Lấy thông tin user theo id (chỉ Admin)
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // Cập nhật thông tin user theo id (chỉ Admin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Xóa user theo id (chỉ Admin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // Lấy thông tin user hiện tại (tự xem/me)
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  // Cập nhật thông tin user hiện tại (tự sửa/me)
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
