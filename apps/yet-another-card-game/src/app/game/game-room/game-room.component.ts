import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { Card, CardNumbers, CardTypes } from '@innoware/api-interfaces';
import { concatMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'innoware-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  private socket: Socket;

  cards: Card[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(({ id }) => {
        this.socket = new Socket({
          url: `${environment.socket}/game-${id}`
        });
        this.socket.on('connect', () => {
          console.log('socket connected to server', this.socket.ioSocket.id);
        });
        this.socket.fromEvent('card').pipe(
          // concatMap(c => of(c).pipe(delay(500)))
        ).subscribe((resp: Card) => {
          this.cards.push(resp);
        });
      });
  }

  transformCard(type: string, cardNumber: string): Card {
    return {
      type: CardTypes[type],
      number: CardNumbers[cardNumber]
    };
  }
}
