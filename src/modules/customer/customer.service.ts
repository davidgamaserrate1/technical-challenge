import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CustomerRepository } from './respository/customer.respository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor(private dataSource: DataSource) {
    this.customerRepository = new CustomerRepository(dataSource);
  }

  async findAll() {
    return this.customerRepository.findAll();
  }

  async findOneById(id: number) {
    const customer = await this.customerRepository.findOneById(id);

    if (!customer) throw new Error('Cliente não encontrado');
    
    return customer
  }

  async findByEmail(email: string) {
    return await this.customerRepository.findByEmail(email);
  }

  async create(data: CreateCustomerDto) {
    return await this.customerRepository.create(data);
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error( 'Cliente não encontrado')

    const updatedData = {
      name: data.name ?? customer.name,
      addres: data.addres ?? customer.addres,
      city: data.city ?? customer.city,
      state: data.state ?? customer.state,
    };

    return await this.customerRepository.update(id, updatedData);
  }

  async remove(id: number) {
    const customer = await this.findOneById(id);
    if (!customer) throw new Error('Cliente não encontrado');

    await this.customerRepository.remove(id);
  }
}
