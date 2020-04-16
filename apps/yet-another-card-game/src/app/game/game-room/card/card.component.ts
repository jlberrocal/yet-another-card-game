import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'innoware-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input()
  cardType: CardTypes;

  @Input()
  cardNumber: CardNumbers | Jokers;

  @Input()
  mini: boolean

  @Output()
  selected = new EventEmitter<null>();

  types = CardTypes;

  checkChange({ checked }: MatCheckboxChange) {
    if (checked) {
      this.selected.emit();
    }
  }
}
