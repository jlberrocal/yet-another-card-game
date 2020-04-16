import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from '@innoware/api-interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { match } from 'cypress/types/minimatch';
import { key } from '../../../shared/rxjs-operators/key';
import { logResponse } from '../../../shared/rxjs-operators/logResponse';

type HoverableCard = Card & {hover: boolean}

@Component({
  selector: 'innoware-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss'],
  animations: [
    trigger('hoverState', [
      state('true', style({
        transform: 'translateY(-50px)',
        zIndex: 500
      })),
      state('false', style({
        top: '0',
        zIndex: '!'
      })),
      transition('* => true',
        animate('200ms ease-in', style({
          transform: 'translateY(-50px)',
          zIndex: '!'
        }))
      ),
      transition('* => false',
        animate('200ms ease-in', style({
          top: 0,
          zIndex: '500'
      }))
      )
    ])
  ]
})
export class PlayerHandComponent {
  @Input()
  cards: HoverableCard[];

  selections: any[] = [];

  readonly isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = breakpointObserver.observe(Breakpoints.HandsetLandscape)
      .pipe(
        logResponse(),
        key<boolean>('matches'),
        shareReplay()
      )
  }

  dragging: boolean;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  cardSelected(card: Card) {

  }

  dragStart(card: HoverableCard) {
    card.hover = false;
    this.dragging = true;
  }

  dragEnded() {
    this.dragging = false;
  }

  hoverOver(card: HoverableCard) {
    if (!this.dragging) {
      card.hover = true;
    }
  }

  mouseLeave(card: HoverableCard) {
    card.hover = false;
  }
}
