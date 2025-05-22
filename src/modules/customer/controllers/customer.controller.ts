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
} from '@nestjs/common';
import { CustomerService } from '../customer.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.customerService.findOneById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async create(@Body() body: CreateCustomerDto) {
    try { 
        return await this.customerService.create(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async update( 
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCustomerDto
  ) {
    try {
      const customerId = id;
      if (!customerId) {
        throw new HttpException('Id de cliente não informado', HttpStatus.UNAUTHORIZED);
      }

      return await this.customerService.update(customerId, body);
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

      await this.customerService.remove(customerId);
      return { message: 'cliente removido com sucesso' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
