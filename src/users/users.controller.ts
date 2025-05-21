import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.findOneById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async create(@Body() body: { name: string; email: string; password: string }) {
    try { 
        return await this.usersService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; email?: string; password?: string; active?: boolean }, 
  ) {
    try {
      return await this.usersService.update(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.remove(id);
      return { message: 'Usuário removido com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
