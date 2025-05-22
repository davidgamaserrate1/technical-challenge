// customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from 'src/modules/sales/entity/sales.entity'; 

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  addres: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 2 })
  state: string;

  // Um customer pode ter vários sales
  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];
}
