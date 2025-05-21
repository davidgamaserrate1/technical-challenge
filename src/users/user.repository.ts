// users/user.repository.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class UserRepository {
  constructor(private dataSource: DataSource) {}

  async findAll() {
    return this.dataSource.query(`SELECT id, name, email, active FROM users ORDER BY id`);
  }

  async findOneById(id: number) {
    const result = await this.dataSource.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await this.dataSource.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result[0];
  }

  async create(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await this.dataSource.query(
      `INSERT INTO users (name, email, password, active) VALUES ($1, $2, $3, true) RETURNING id, name, email, active`,
      [data.name, data.email, hashedPassword]
    );
    return result[0];
  }

  async update(id: number, data: { name: string; email: string; password: string; active: boolean }) {
    const result = await this.dataSource.query(
      `UPDATE users SET name = $1, email = $2, password = $3, active = $4 WHERE id = $5 RETURNING id, name, email, active`,
      [data.name, data.email, data.password, data.active, id]
    );
    return result[0];
  }

  async remove(id: number) {
    await this.dataSource.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}
