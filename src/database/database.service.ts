// src/database/database.service.ts

import { Injectable } from '@nestjs/common';
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const [results] = await this.pool.execute<T[] & RowDataPacket[]>(
      sql,
      params,
    );
    return results;
  }
}
