import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID duy nhất của người dùng' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'hoang_user',
    description: 'Tên đăng nhập của người dùng',
  })
  username: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'hoang@example.com',
    description: 'Địa chỉ email của người dùng',
  })
  email: string;

  @Column({ name: 'full_name', nullable: true })
  @ApiProperty({
    example: 'Nguyễn Văn Hoàng',
    description: 'Họ và tên đầy đủ của người dùng',
  })
  fullName: string;

  @Column({ name: 'phone_number', nullable: true })
  @ApiProperty({
    example: '0901234567',
    description: 'Số điện thoại liên lạc',
  })
  phoneNumber: string;

  @Column({ default: 'active' })
  @ApiProperty({
    example: 'active',
    description: 'Trạng thái tài khoản (active, inactive, v.v.)',
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Ngày giờ tạo tài khoản' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'Ngày giờ cập nhật thông tin lần cuối' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty({ description: 'Ngày giờ xóa mềm tài khoản' })
  deletedAt: Date;
}
