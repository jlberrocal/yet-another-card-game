import { Card, CardNumbers, CardTypes } from '@innoware/api-interfaces';

export const CardsMock: Card[] = [
  { type: CardTypes['SPADES'], number: CardNumbers['KING'] },
  { type: CardTypes['HEARTS'], number: CardNumbers['QUEEN'] },
  { type: CardTypes['HEARTS'], number: CardNumbers['ACE'] },
  { type: CardTypes['CLUBS'], number: CardNumbers['SIX'] },
  { type: CardTypes['DIAMONDS'], number: CardNumbers['TWO'] },
  { type: CardTypes['DIAMONDS'], number: CardNumbers['TEN'] },
  { type: CardTypes['CLUBS'], number: CardNumbers['TWO'] },
  { type: CardTypes['HEARTS'], number: CardNumbers['THREE'] },
  { type: CardTypes['CLUBS'], number: CardNumbers['EIGHT'] }
];
