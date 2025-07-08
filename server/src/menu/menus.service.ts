/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new this.menuModel(createMenuDto);
    return menu.save();
  }

  async findAllSpecial(): Promise<Menu[]> {
    return this.menuModel.find({ isSpecial: true }).exec();
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuModel.findById(id).exec();
    if (!menu) throw new NotFoundException('Không tìm thấy món ăn!');
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.menuModel.findByIdAndUpdate(id, updateMenuDto, { new: true }).exec();
    if (!menu) throw new NotFoundException('Không tìm thấy món ăn!');
    return menu;
  }

  async remove(id: string): Promise<void> {
    const res = await this.menuModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Không tìm thấy món ăn!');
  }

  async countAll(): Promise<number> {
    return this.menuModel.countDocuments({});
  }

  async findAllAll(page?: string, limit?: string): Promise<Menu[]> {
  // Nếu muốn phân trang
  const p = Number(page) || 1;
  const l = Number(limit) || 100; // mặc định trả 100 món, có thể đổi tùy ý
  return this.menuModel.find({})
    .skip((p - 1) * l)
    .limit(l)
    .exec();
}

}
