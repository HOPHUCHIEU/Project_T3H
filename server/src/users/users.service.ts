/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { email, password, username, phone, status } = createUserDto;
      if (await this.userModel.findOne({ email })) {
        throw new UnauthorizedException('Email đã tồn tại trong hệ thống');
      }
      if (phone && await this.userModel.findOne({ phone })) {
        throw new UnauthorizedException('Số điện thoại đã tồn tại trong hệ thống');
      }
      const hashedPassword = await hash(password, 10);
      const newUser = new this.userModel({
        email,
        username,
        phone,
        password: hashedPassword,
        role: 'user',
        status: status && ['active','blocked'].includes(status) ? status : 'active',
      });
      const user = await newUser.save();
      return this.generateUserResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new Error('Có lỗi xảy ra khi tạo người dùng');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      if (user.status === 'blocked') throw new UnauthorizedException('Tài khoản đã bị khoá. Liên hệ admin!');
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }
      return this.generateUserResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new Error('Có lỗi xảy ra khi đăng nhập');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    if (!id || id.length !== 24) throw new NotFoundException('ID người dùng không hợp lệ');
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    // Kiểm tra email mới nếu có
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      if (await this.userModel.findOne({ email: updateUserDto.email })) {
        throw new BadRequestException('Email đã tồn tại');
      }
    }
    // Kiểm tra SĐT mới nếu có
    if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
      if (await this.userModel.findOne({ phone: updateUserDto.phone })) {
        throw new BadRequestException('Số điện thoại đã tồn tại');
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }
    // status chỉ cho phép active hoặc blocked
    if (updateUserDto.status && !['active', 'blocked'].includes(updateUserDto.status)) {
      delete updateUserDto.status;
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return this.userModel.findByIdAndDelete(id).exec();
  }

  private generateUserResponse(user: UserDocument) {
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
      token,
    };
  }
}
