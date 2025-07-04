/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString, Matches, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^0\d{9,10}$/, { message: 'Phone không hợp lệ' })
  phone?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['active', 'blocked'])
  status?: string; // <== THÊM DÒNG NÀY
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
