import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from 'src/modules/customer/entity/customer.entity';  
import { User } from '../../users/entity/user.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

 @Column('decimal', { precision: 6, scale: 2 })
  totalPrice: number;

  // Relação com Customer
  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // Relação com User
  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'user_id' })
  user: User;
}


