import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameRoomComponent } from './game-room/game-room.component';


@NgModule({
  declarations: [GameRoomComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
