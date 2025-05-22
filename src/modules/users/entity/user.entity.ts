// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from 'src/modules/sales/entity/sales.entity'; 

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  active: boolean;

  // Um user pode registrar vários sales
  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];
}
