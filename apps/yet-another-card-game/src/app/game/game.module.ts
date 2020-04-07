import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameRoomComponent } from './game-room/game-room.component';
import { PlayerHandComponent } from './game-room/player-hand/player-hand.component';
import { CardComponent } from './game-room/card/card.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [GameRoomComponent, PlayerHandComponent, CardComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    FlexModule,
    MatCardModule,
    DragDropModule
  ]
})
export class GameModule { }
