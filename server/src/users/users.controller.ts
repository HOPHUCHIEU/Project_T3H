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
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // Đăng ký user (chỉ Admin mới được phép)
  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Đăng nhập user
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
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

  @Get('me')
@UseGuards(JwtAuthGuard)
async getMe(@Req() req) {
  return this.userService.findOne(req.user.id); // SỬA LẠI ĐÚNG KEY
}

@Patch('me')
@UseGuards(JwtAuthGuard)
async updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.update(req.user.id, updateUserDto); // SỬA LẠI ĐÚNG KEY
}

}
