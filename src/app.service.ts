import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private db: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<User[]> {
    const sql = 'SELECT id, token, name, email FROM users';
    const users = await this.db.query<User>(sql);
    return users;
  }
}

interface User {
  id: number;
  token: number;
  name: string;
  email: string;
}

export { User };
