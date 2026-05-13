import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'hoang_user',
    description: 'Tên đăng nhập của người dùng',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'hoang@example.com',
    description: 'Địa chỉ email của người dùng',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Nguyễn Văn Hoàng',
    description: 'Họ và tên đầy đủ của người dùng',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    example: '0901234567',
    description: 'Số điện thoại liên lạc',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
