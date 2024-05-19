import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './app.service';
import { Auth } from './decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Auth()
  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }
}
