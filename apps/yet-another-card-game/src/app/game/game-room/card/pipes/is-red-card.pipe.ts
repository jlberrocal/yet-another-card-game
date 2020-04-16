import { Pipe, PipeTransform } from '@angular/core';
import { CardTypes } from '@innoware/api-interfaces';

@Pipe({
  name: 'isRedCard'
})
export class IsRedCardPipe implements PipeTransform {

  transform(value: CardTypes): boolean {
    return value === CardTypes.HEARTS || value === CardTypes.DIAMONDS;
  }

}
