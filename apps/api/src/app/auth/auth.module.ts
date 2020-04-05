import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environment } from '../../environments/environment';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService): Promise<JwtModuleOptions> => {
        return {
          secret: config.get<string>('SECRET'),
          signOptions: {
            expiresIn: environment.production ? '4h' : '1y'
          }
        };
      },
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
