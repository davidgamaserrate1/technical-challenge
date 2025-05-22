import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}


