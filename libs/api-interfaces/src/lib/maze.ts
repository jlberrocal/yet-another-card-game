import { CardNumbers, CardTypes } from '@innoware/api-interfaces';

export type NumberKeys = keyof CardNumbers

export type Maze = {
  [TKey in CardTypes]: NumberKeys[]
}
