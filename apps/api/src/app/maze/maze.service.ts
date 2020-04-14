import { Injectable } from '@nestjs/common';
import { Card, CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';

@Injectable()
export class MazeService {
  * generateHands(): IterableIterator<Card> {
    let maze = this.generateMaze();

    for (let i = 0; i < 10; i++) {
      maze = this.disarray(maze)
    }

    while (maze.length) {
      yield { ...maze.pop() };
    }
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
          number: cardType === CardTypes.JOKERS ? Jokers[number] : CardNumbers[number]
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
