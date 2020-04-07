import { Module } from '@nestjs/common';
import { MazeService } from './maze.service';

@Module({
  providers: [MazeService],
  exports: [MazeModule]
})
export class MazeModule {
}
