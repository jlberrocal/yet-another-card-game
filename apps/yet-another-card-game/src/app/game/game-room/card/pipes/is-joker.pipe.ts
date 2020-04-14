import { Pipe, PipeTransform } from '@angular/core';
import { CardNumbers, Jokers } from '@innoware/api-interfaces';

@Pipe({
  name: 'isJoker'
})
export class IsJokerPipe implements PipeTransform {

  transform(value: CardNumbers | Jokers): boolean {
    return value === Jokers.BLACK || value === Jokers.RED;
  }

}
