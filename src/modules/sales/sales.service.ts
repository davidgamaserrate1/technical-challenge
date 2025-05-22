import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SalesRepository } from './respository/sales.repository';
import { CreateSaleDto, SaleDto, UpdateSaleDto } from './dto/sales.dto';
import { CustomerRepository } from '../customer/respository/customer.respository';



@Injectable()
export class SalesService {
  private salesRepository: SalesRepository;
  private customerRepository: CustomerRepository ;

  constructor(private dataSource: DataSource) {
    this.salesRepository = new SalesRepository(dataSource);
    this.customerRepository = new CustomerRepository(dataSource);
  }

  mapToSaleDto(raw: any): SaleDto {
    return {
      id: raw.id,
      date: raw.date,
      total_price: raw.totalPrice,
      customer: {
        id: raw.customer_id,
        name: raw.customer_name,
        addres: raw.customer_addres,
        city: raw.customer_city,
        state: raw.customer_state,
      },
      user: {
        id: raw.user_id,
        name: raw.user_name,
        email: raw.user_email,
        active: raw.user_active,
      },
    };
  }

  async findAll(): Promise<SaleDto[]> {
    const sales = await this.salesRepository.findAll();
    return sales.map(this.mapToSaleDto);
  }

  async findOneById(id: number) {
    const sale = await this.salesRepository.findOneById(id);
    if (!sale) throw new Error('Venda não encontrada');
    
    const salle_mappeds = this.mapToSaleDto(sale)  
    return salle_mappeds
  }

  async findSaleByCustomerId(customer_id: number) {
    const sales = await this.salesRepository.findSaleByCustomerId(customer_id);
    if (!sales || sales.length ==0) throw new Error('Nehuma venda encontrada para o cliente informado');
    
    return sales
  }

  async findSaleByUserId(user_id: number) {
    const sales = await this.salesRepository.findSaleByUserId(user_id);
    if (!sales || sales.length ==0) throw new Error('Nehuma venda encontrada para o usuario informado');
    
    return sales
  }

  async findSaleByPeriod(start: string, end:string) {
    const sales = await this.salesRepository.findSaleByPeriod(start, end);
    if (!sales || sales.length ==0) throw new Error('Nehuma venda encontrada para o periodo informado');
    
    const total_sales_by_period = sales.reduce((acc, sale) => acc + Number(sale.totalprice), 0);

    return {
      sales: sales,
      total: total_sales_by_period.toFixed(2)
    }
  }

  async create(data: CreateSaleDto) {
    const validate_customer = await this.customerRepository.findOneById(data.customer_id)
    if (!validate_customer || validate_customer.length == 0){
      throw new Error( 'Cliente informado não registrado na base')
    }

    return await this.salesRepository.create(data);
  }

  async update(id: number, data: UpdateSaleDto) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error( 'Venda não encontrada')

    const updatedData = {
      date: data.date ?? customer.date,
      total_price: data.total_price ?? customer.total_price,
      customer_id: data.customer_id ?? customer.customer.id,
    };

    return await this.salesRepository.update(id, updatedData);
  }

  async remove(id: number) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error('Venda não encontrada');

    await this.salesRepository.remove(id);
  }
}
