import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  private salesRepository: SalesRepository;

  constructor(private dataSource: DataSource) {
    this.salesRepository = new SalesRepository(dataSource);
  }

  async findAll() {
    const sales = await this.salesRepository.findAll();
    const salles_mappeds = sales.map((sale) => {
      return {
        'id': sale.id,
        'date': sale.date,
        'total_price' :sale.totalPrice,
        'customer':{
          'id': sale.customer_id,
          'name': sale.customer_name,
          'addres': sale.customer_addres,
          'city': sale.customer_city,
          'tate' : sale.customer_state,
        } ,
        'user' :{
          'id': sale.user_id,
          'name': sale.user_name,
          'email': sale.user_email,
          'active': sale.user_active
        }
      }
    })

    return salles_mappeds
  }

  async findOneById(id: number) {
    const sale = await this.salesRepository.findOneById(id);

    if (!sale) throw new Error('Venda não encontrada');
    
    const salle_mappeds = {
      'id': sale.id,
      'date': sale.date,
      'total_price' :sale.totalPrice,
      'customer':{
        'id': sale.customer_id,
        'name': sale.customer_name,
        'addres': sale.customer_addres,
        'city': sale.customer_city,
        'tate' : sale.customer_state,
      } ,
      'user' :{
        'id': sale.user_id,
        'name': sale.user_name,
        'email': sale.user_email,
        'active': sale.user_active
      }
    }

    return salle_mappeds
  }
 

  async create(data: { date: string; total_price:number; customer_id: number; user_id: number; }) {
    return await this.salesRepository.create(data);
  }

  async update(id: number, data: { date?: string; total_price?: number; customer_id: number; user_id: number; }) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error( 'Venda não encontrada')

    const updatedData = {
      date: data.date ?? customer.date,
      total_price: data.total_price ?? customer.total_price,
      customer_id: data.customer_id ?? customer.customer.id,
      user_id: data.user_id ?? customer.user.id,
    };

    return await this.salesRepository.update(id, updatedData);
  }

  async remove(id: number) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error('Venda não encontrada');

    await this.salesRepository.remove(id);
  }
}
