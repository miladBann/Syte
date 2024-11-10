import { Controller, Get, Post, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async create(@Body('username') username: string, @Body('email') email: string) {
    return await this.userService.createUser(username, email);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
