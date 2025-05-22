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
  Query,
} from '@nestjs/common';
import { SalesService } from '../sales.service';  
import { JwtAuthGuard } from 'src/modules/auth/guard/auth.guard';
import { UpdateSaleDto } from '../dto/sales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.salesService.findAll();
  }

  @Get('report')
  @UseGuards(JwtAuthGuard)
  async findSaleByPeriod(
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    try {
      if (!start || !end) {
        throw new HttpException('Parâmetros "start" e "end" são obrigatórios',HttpStatus.BAD_REQUEST);
      }

      return await this.salesService.findSaleByPeriod(start, end);
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
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

  @Get('customer/:customer_id')
  @UseGuards(JwtAuthGuard)
  async findSaleByCustomerId(@Param('customer_id', ParseIntPipe) customer_id: number) {
    try {
      return await this.salesService.findSaleByCustomerId(customer_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('user/:user_id')
  @UseGuards(JwtAuthGuard)
  async findSaleByUserId(@Param('user_id', ParseIntPipe) user_id: number) {
    try {
      return await this.salesService.findSaleByUserId(user_id);
      
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
    @Body() body: UpdateSaleDto
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
