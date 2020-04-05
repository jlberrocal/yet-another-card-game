import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MazeModule } from './maze/maze.module';
import { SocketsModule } from './sockets/sockets.module';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MazeModule,
    ConfigModule.forRoot(),
    SocketsModule,
    GameModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'game.db3',
      logging: environment.production ? ['error'] : 'all',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '4h'
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
