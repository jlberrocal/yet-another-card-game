import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardNumbers, CardTypes } from '@innoware/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Constants from '../constants';

@Injectable()
export class CardFetcherService {

  constructor(private http: HttpClient) {
  }

  fetch(type: CardTypes, cardNumber: CardNumbers): Observable<string> {
    return this.http.get<string>('/assets/images/card.svg', {
      responseType: 'text' as any
    }).pipe(
      map((svg: string) => {
        return svg
          .replace('{{symbol}}', Constants[type.toLocaleLowerCase()])
          .replace(/{{number}}/gi, cardNumber)
          .replace(/{{numberColor}}/gi, this.numberColor(type))
          .replace('{{symbol_mini}}', Constants[type.toLocaleLowerCase() + '_mini']);
      })
    );
  }

  private numberColor(cardType: CardTypes) {
    switch (cardType) {
      case CardTypes.CLUBS:
      case CardTypes.SPADES:
      default:
        return '#000';
      case CardTypes.DIAMONDS:
      case CardTypes.HEARTS:
        return '#d40000';
    }
  }
}
