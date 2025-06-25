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
      const { email, password, username, role } = createUserDto;
      // Check if user exists
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new UnauthorizedException('Email đã tồn tại trong hệ thống');
      }

      // Hash password
      const hashedPassword = await hash(password, 10);
      const newUser = new this.userModel({
        email,
        username,
        password: hashedPassword,
        role: role || 'user',
      });
      const user = await newUser.save();
      return this.generateUserResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new Error('Có lỗi xảy ra khi tạo người dùng');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      // Tìm user và validate
      const user = await this.userModel.findOne({ email });
      if (!user) {
        // Không nên cho biết cụ thể là email không tồn tại vì lý do bảo mật
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }

      // Xác thực mật khẩu
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        // Delay 1 giây để tránh brute force attack
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
      }

      // Tạo token và trả về thông tin user
      const response = this.generateUserResponse(user);
      
      // Log successful login attempt
      console.log(`User ${user.email} logged in successfully at ${new Date().toISOString()}`);
      
      return response;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Login error:', error);
      throw new Error('Có lỗi xảy ra khi đăng nhập');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().select('-password').exec();
      return users;
    } catch (error) {
      throw new Error('Có lỗi xảy ra khi lấy danh sách người dùng');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      // Kiểm tra id hợp lệ
      if (!id || id.length !== 24) {
        throw new NotFoundException('ID người dùng không hợp lệ');
      }
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      // Ghi log lỗi chi tiết để debug
      console.error('findOne user error:', error);
      throw new Error('Có lỗi xảy ra khi tìm kiếm người dùng');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }

      // Kiểm tra email mới nếu có
      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUser = await this.userModel.findOne({
          email: updateUserDto.email,
        });
        if (existingUser) {
          throw new BadRequestException('Email đã tồn tại');
        }
      }

      // Mã hóa mật khẩu mới nếu có
      if (updateUserDto.password) {
        updateUserDto.password = await hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();

      return updatedUser;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new Error('Có lỗi xảy ra khi cập nhật thông tin người dùng');
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      return deletedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Có lỗi xảy ra khi xóa người dùng');
    }
  }

  private generateUserResponse(user: UserDocument) {
    const token = this.jwtService.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }
}