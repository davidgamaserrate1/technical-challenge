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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update( 
    @Request() req,
    @Body() body: { name?: string; email?: string; password?: string; active?: boolean }
  ) {
    try {
      const userId = req.user.id;
      if (!userId) {
        throw new HttpException('Token inválido ou malformado: ID do usuário não encontrado', HttpStatus.UNAUTHORIZED);
      }


      return await this.usersService.update(userId, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Request() req,
  ) {
    try {
      console.log("req.user", req.user)
      const userId = req.user.id;
      await this.usersService.remove(userId);
      return { message: 'Usuário removido com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
