import { Controller, Get } from '@nestjs/common';
import { Student, StudentsService } from './students.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }
}
