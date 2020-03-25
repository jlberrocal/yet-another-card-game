import { Module } from '@nestjs/common';
import { MazeController } from './maze.controller';

@Module({
  controllers: [MazeController]
})
export class MazeModule {}
