import { ForbiddenException, Injectable } from '@nestjs/common';
import { Card, CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';

@Injectable()
export class MazeService {
  *generateHands(players: string[]): IterableIterator<Promise<Card & {player: string}>> {
    const maze = this.disarray(this.generateMaze());

    let index = 0;
    const hands = {};
    while (maze.length) {
      yield new Promise<Card&{player: string}>(resolve => setTimeout(resolve, 50)).then(() => {
        return {
          ...maze.pop(),
          player: players[index]
        }
      });
      index = index === players.length - 1 ? 0 : index + 1;
    }
    index = 0;
    return maze.reduce((cards, card) => {
      index++;
      if (!hands[index]) {
        hands[index] = [];
      }
      hands[index].push(card);

      if (index === players.length) {
        index = 0;
      }

      return hands;
    }, {});
  }
  private generateMaze(): Card[] {
    const origins = {
      [CardTypes.JOKERS]: Object.keys(Jokers),
      [CardTypes.CLUBS]: Object.keys(CardNumbers),
      [CardTypes.DIAMONDS]: Object.keys(CardNumbers),
      [CardTypes.HEARTS]: Object.keys(CardNumbers),
      [CardTypes.SPADES]: Object.keys(CardNumbers)
    };
    return Object.keys(origins).reduce((prev, cardType) => {
      prev.push(...origins[cardType].map(number => {
        return {
          type: CardTypes[cardType],
          number: CardNumbers[number]
        };
      }));
      return prev;
    }, []);
  }

  private disarray(arr: Card[]): Card[] {
    const alreadyTakenIndexes: number[] = [];
    return [
      ...arr.map(() => arr[this.nextAvailable(arr.length, alreadyTakenIndexes)])
    ];
  }

  private nextAvailable(length: number, alreadyTaken: number[]): number {
    const next = Math.floor(Math.random() * length);
    if (alreadyTaken.includes(next)) {
      return this.nextAvailable(length, alreadyTaken);
    } else {
      alreadyTaken.push(next);
      return next;
    }
  }
}
