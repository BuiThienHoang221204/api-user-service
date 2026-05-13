import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiResponse({
    status: 201,
    description: 'Người dùng đã được tạo thành công.',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'Tên đăng nhập hoặc Email đã tồn tại.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách người dùng (có thể tìm theo email, phone)',
  })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách người dùng.',
    type: [User],
  })
  findAll(@Query('email') email?: string, @Query('phone') phone?: string) {
    return this.usersService.findAll(email, phone);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Trả về thông tin người dùng.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findBy({ id: +id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin người dùng thành công.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Xóa người dùng theo ID (Xóa mềm)' })
  @ApiResponse({
    status: 204,
    description: 'Người dùng đã được xóa thành công.',
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
