import { CardNumbers, CardTypes } from '@innoware/api-interfaces';
import { Jokers } from './jokers';

export interface Card {
  type: CardTypes;
  number: CardNumbers | Jokers;
}
