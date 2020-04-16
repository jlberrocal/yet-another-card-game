import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameRoomComponent } from './game-room/game-room.component';
import { PlayerHandComponent } from './game-room/player-hand/player-hand.component';
import { CardComponent } from './game-room/card/card.component';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IsJokerPipe } from './game-room/card/pipes/is-joker.pipe';
import { IsRedCardPipe } from './game-room/card/pipes/is-red-card.pipe';

@NgModule({
  declarations: [GameRoomComponent, PlayerHandComponent, CardComponent, IsJokerPipe, IsRedCardPipe],
  imports: [
    CommonModule,
    GameRoutingModule,
    FlexModule,
    MatCardModule,
    DragDropModule,
    MatSnackBarModule,
    MatCheckboxModule
  ]
})
export class GameModule {
}
