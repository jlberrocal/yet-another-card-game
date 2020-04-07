import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { Card, CardNumbers, CardTypes } from '@innoware/api-interfaces';

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
        this.socket.on('card', (resp: Card) => {
          this.cards.push(resp);
          console.log(resp);
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
