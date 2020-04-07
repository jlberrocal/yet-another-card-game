import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import * as Constants from '../constants';

@Injectable()
export class CardFetcherService {
  readonly cache = {};

  constructor(private http: HttpClient) {
  }

  fetch(type: CardTypes, cardNumber: CardNumbers | Jokers): Observable<string> {
    const assetUrl = `/assets/images/card${type === CardTypes.JOKERS ? '-joker' : ''}.svg`;
    if (this.cache[assetUrl]) {
      console.log('using cache');
      return of(this.cache[assetUrl]).pipe(take(1));
    }
    return this.http.get<string>(assetUrl, {
      responseType: 'text' as any
    }).pipe(
      map((svg: string) => {
        return svg
          .replace('{{symbol}}', Constants[type.toLocaleLowerCase()])
          .replace(/{{number}}/gi, cardNumber)
          .replace(/{{numberColor}}/gi, this.numberColor(type, type === CardTypes.JOKERS ? cardNumber as any : null))
          .replace('{{symbol_mini}}', Constants[type.toLocaleLowerCase() + '_mini']);
      }),
      tap((svg) => this.cache[assetUrl] = svg)
    );
  }

  private numberColor(cardType: CardTypes, color?: Jokers) {
    switch (cardType) {
      case CardTypes.CLUBS:
      case CardTypes.SPADES:
        return '#000';
      case CardTypes.DIAMONDS:
      case CardTypes.HEARTS:
        return '#d40000';
      case CardTypes.JOKERS:
        return color === Jokers.RED ? '#d40000' : '#000';
    }
  }
}
