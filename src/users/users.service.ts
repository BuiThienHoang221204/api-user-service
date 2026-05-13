import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Tạo người dùng mới
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error: any) {
      this.handleDatabaseError(error);
    }
  }

  /**
   * Lấy danh sách người dùng, hỗ trợ tìm kiếm theo email hoặc phone
   */
  async findAll(email?: string, phone?: string): Promise<User[]> {
    const where: FindOptionsWhere<User> = {};
    if (email) {
      where.email = email;
    }
    if (phone) {
      where.phoneNumber = phone;
    }
    return await this.userRepository.find({ where });
  }

  /**
   * Tìm kiếm người dùng dựa trên các trường cụ thể (id, email, phone, etc.)
   */
  async findBy(fields: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: fields });
    if (!user) {
      const fieldKey = Object.keys(fields)[0] as keyof FindOptionsWhere<User>;
      const fieldValue = fields[fieldKey];
      const displayValue =
        typeof fieldValue === 'object'
          ? JSON.stringify(fieldValue)
          : String(fieldValue);
      throw new NotFoundException(
        `Không tìm thấy người dùng với ${fieldKey}: ${displayValue}`,
      );
    }
    return user;
  }

  /**
   * Cập nhật thông tin người dùng
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findBy({ id });
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    try {
      return await this.userRepository.save(updatedUser);
    } catch (error: any) {
      this.handleDatabaseError(error);
    }
  }

  /**
   * Xóa mềm người dùng
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }
  }

  /**
   * Xử lý tập trung các lỗi từ Database
   */
  private handleDatabaseError(error: unknown): never {
    // Mã lỗi 1062 hoặc ER_DUP_ENTRY cho biết bị trùng khóa Unique
    if (typeof error === 'object' && error !== null) {
      const err = error as Record<string, unknown>;
      if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
        throw new ConflictException(
          'Dữ liệu đã tồn tại (Tên đăng nhập hoặc Email bị trùng)',
        );
      }
      if (typeof err.message === 'string') {
        throw new BadRequestException('Lỗi xử lý dữ liệu: ' + err.message);
      }
    }
    throw new BadRequestException('Lỗi xử lý dữ liệu không xác định');
  }
}
