import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, DatabaseService],
})
export class StudentsModule {}
