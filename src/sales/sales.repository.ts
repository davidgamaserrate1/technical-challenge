import { DataSource } from 'typeorm';

export class SalesRepository {
  constructor(private dataSource: DataSource) {}

  async findAll() {
    return this.dataSource.query(`
        SELECT 
            s."id", 
            s."date", 
            s."totalPrice",
            c."id"     as customer_id, 
            c."name"   as customer_name, 
            c."addres" as customer_addres,
            c."city"   as customer_city,
            c."state"  as customer_state,
            u."id"     as user_id,
            u."name"   as user_name,
            u."email"  as user_email,
            u."active" as user_active
        FROM sales s
            LEFT JOIN customers c on c.id = s.customer_id 
            LEFT JOIN users u on u.id = s.user_id
        ORDER BY s.id DESC
        `);
  }

  async findOneById(id: number) {
    const result = await this.dataSource.query(`
        SELECT 
            s."id", 
            s."date", 
            s."totalPrice",
            c."id"     as customer_id, 
            c."name"   as customer_name, 
            c."addres" as customer_addres,
            c."city"   as customer_city,
            c."state"  as customer_state,
            u."id"     as user_id,
            u."name"   as user_name,
            u."email"  as user_email,
            u."active" as user_active
        FROM sales s
            LEFT JOIN customers c on c.id = s.customer_id 
            LEFT JOIN users u on u.id = s.user_id
        WHERE s.id = $1`, [id]
    );
    return result[0];
  }
 
  async create(data: { date: string; total_price:number; customer_id: number; user_id: number;  }) {
    const result = await this.dataSource.query(
      `INSERT INTO sales ( "date" , "totalPrice" , "customer_id" , "user_id" ) VALUES ($1, $2, $3, $4) RETURNING "id", "date" , "totalPrice"  as "total_price", "customer_id" , "user_id"`,
      [data.date, data.total_price, data.customer_id, data.user_id]
    );
    return result[0];
  }

  async update(id: number, data: { date: string; total_price:number; customer_id: number;  }) {
    const result = await this.dataSource.query(
      `UPDATE sales SET date = $1, "totalPrice" = $2, customer_id = $3  WHERE id = $4 RETURNING "id", "date", "totalPrice", "customer_id", "user_id"`,
      [data.date, data.total_price, data.customer_id, id]
    );
    return result[0];
  }

  async remove(id: number) {
    await this.dataSource.query(`DELETE FROM sales WHERE id = $1`, [id]);
  }
}
