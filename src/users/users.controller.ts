import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  public async create(@Body() body: CreateUserDto) {
    try {
      return await this.usersService.createUser(body);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  public async read(@Param('id') id: string) {
    try {
      return await this.usersService.getMe(id);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      return await this.usersService.updateUser(id, body);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      return error;
    }
  }
}
