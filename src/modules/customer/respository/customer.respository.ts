import { DataSource } from 'typeorm';

export class CustomerRepository {
  constructor(private dataSource: DataSource) {}

  async findAll() {
    return this.dataSource.query(`SELECT id, name, addres, city, state FROM customers ORDER BY id DESC`);
  }

  async findOneById(id: number) {
    const result = await this.dataSource.query(`SELECT id, name, addres, city, state FROM customers WHERE id = $1`, [id]);
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await this.dataSource.query(`SELECT id, name, addres, city, state FROM customers WHERE email = $1`, [email]);
    return result[0];
  }

  async create(data: { name: string; addres: string; city: string; state: string }) {

    const result = await this.dataSource.query(
      `INSERT INTO customers (name, addres, city, state ) VALUES ($1, $2, $3, $4) RETURNING id, name, addres, city, state`,
      [data.name, data.addres, data.city, data.state]
    );
    return result[0];
  }

  async update(id: number, data: { name: string; addres: string; city: string; state: string }) {
    const result = await this.dataSource.query(
      `UPDATE customers SET name = $1, addres = $2, city = $3, state = $4 WHERE id = $5 RETURNING id, name, addres, city, state`,
      [data.name, data.addres, data.city, data.state, id]
    );
    return result[0];
  }

  async remove(id: number) {
    await this.dataSource.query(`DELETE FROM customers WHERE id = $1`, [id]);
  }
}
