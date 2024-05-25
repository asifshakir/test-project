import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentsService {
  constructor(private db: DatabaseService) {}

  async getStudents(): Promise<Student[]> {
    const sql = `SELECT c.code class_code, u.name 
                FROM classes c
                INNER JOIN class_students cs ON c.id = cs.class_id
                INNER JOIN users u ON u.token = cs.token_no
                WHERE 
                    c.status = 'A'
                    AND cs.removed_at IS NULL
                `;
    const users = await this.db.query<Student>(sql);
    return users;
  }
}

interface Student {
  class_code: string;
  name: string;
}

export { Student };
