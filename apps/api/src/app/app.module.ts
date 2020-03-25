import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MazeModule } from './maze/maze.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [MazeModule, ConfigModule.forRoot(), SocketsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
