import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '@innoware/api-interfaces';
import { CardFetcherService } from '../card/services/card-fetcher.service';

@Component({
  selector: 'innoware-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],
  viewProviders: [CardFetcherService]
})
export class PlayerHandComponent {
  @Input()
  cards: Card[];

  selections: any[] = [];

  dragging: boolean;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  cardSelected(card: Card) {

  }

  dragStart(e: any) {
    console.log(e);
    this.dragging = true;
  }

  dragEnded() {
    this.dragging = false;
  }
}
