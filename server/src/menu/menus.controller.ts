/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import * as path from 'path';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  //lấy tất cả menu ra trang chủ (public, không cần quyền admin)
  @Get('all')
  findAllPublic(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.menusService.findAllAll(page, limit);
  }

  // 1. Admin: Tạo mới món ăn
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  // 2. Admin: Lấy tất cả menu (dùng cho trang quản lý)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    // Có thể truyền query page/limit nếu muốn phân trang
    return this.menusService.findAllAll(page, limit);
  }

  // 3. User: Lấy danh sách món ăn đặc biệt (menu nổi bật)
  @Get('special')
  findSpecial() {
    return this.menusService.findAllSpecial();
  }

  // 4. Admin: Xem thông tin một món ăn
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  // 5. Admin: Sửa món ăn
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  // 6. Admin: Xóa món ăn
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }

  // 7. Admin: Đếm tổng số menu
  @Get('count')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  countMenus() {
    return this.menusService.countAll();
  }

  // 8. Admin: Upload ảnh món ăn
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/menus',
        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const ext = path.extname(file.originalname);
          const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
          cb(null, name);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/menus/${file.filename}`,
    };
  }
}
