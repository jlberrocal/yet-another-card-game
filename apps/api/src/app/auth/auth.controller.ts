import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '@innoware/api-interfaces';
import { AuthService } from './auth.service';
import { LoginDto } from '@innoware/api-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto): Promise<any> {
    return this.service.save(body);
  }

  @Post('login')
  login(@Body() {username, password}: LoginDto): Promise<any> {
    return this.service.login(username, password);
  }
}
