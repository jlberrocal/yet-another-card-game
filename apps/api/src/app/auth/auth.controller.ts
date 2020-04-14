import { Body, Controller, Logger, Post } from '@nestjs/common';
import { RegisterDto } from '@innoware/api-interfaces';
import { AuthService } from './auth.service';
import { LoginDto } from '@innoware/api-interfaces';
import { LoggerFactory } from '../utils/logger-factory';

@Controller('auth')
export class AuthController {
  @LoggerFactory()
  private logger: Logger;

  constructor(private readonly service: AuthService) {
    this.logger.log('auth controller created');
  }

  @Post('register')
  register(@Body() body: RegisterDto): Promise<string> {
    return this.service.save(body);
  }

  @Post('login')
  login(@Body() {username, password}: LoginDto): Promise<string> {
    return this.service.login(username, password);
  }
}
