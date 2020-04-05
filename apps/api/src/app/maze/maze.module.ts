import { Module } from '@nestjs/common';
import { MazeController } from './maze.controller';
import { SocketsModule } from '../sockets/sockets.module';

@Module({
  controllers: [MazeController],
  imports: [SocketsModule]
})
export class MazeModule {}
