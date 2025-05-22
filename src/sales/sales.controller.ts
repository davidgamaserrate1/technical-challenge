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
  UseGuards,
  Request,
} from '@nestjs/common';
import { SalesService } from './sales.service';  
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.salesService.findOneById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() body: { date: string; total_price:number; customer_id: number;  }
  ) {
    try { 
        const new_body = {
          ...body,
          user_id: req.user.id
        }
        return await this.salesService.create(new_body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async update( 
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { date?: string; total_price?: number; customer_id: number; user_id: number; }
  ) {
    try {
      const customerId = id;
      if (!customerId) {
        throw new HttpException('Id de cliente não informado', HttpStatus.UNAUTHORIZED);
      }
      return await this.salesService.update(customerId, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const customerId = id;
      if (!customerId) {
        throw new HttpException('Id de cliente não informado', HttpStatus.UNAUTHORIZED);
      }

      await this.salesService.remove(customerId);
      return { message: 'cliente removido com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
