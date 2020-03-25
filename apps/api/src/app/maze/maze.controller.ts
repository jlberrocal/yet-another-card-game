import { Controller, ForbiddenException, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CardNumbers, CardTypes, iterableEnum, Maze } from '@innoware/api-interfaces';

@Controller('maze')
export class MazeController {
  @Get()
  generateMaze(): Maze {
    const maze: Maze = {} as any;
    Object.keys(iterableEnum(CardTypes))
      .filter(key => CardTypes[key] !== 10)
      .forEach(key => {
        maze[key] = [];
        Object.keys(iterableEnum(CardNumbers))
          .forEach(number => {
            maze[key].push(number);
          });
      });
    maze['JOKERS'] = ['RED', 'BLACK'];
    return maze;
  }

  @Get(':players')
  generateHands(@Param('players', ParseIntPipe) players: number) {
    if (players < 3) {
      throw new ForbiddenException('must be at least 3 players')
    } else if (players > 6) {
      throw new ForbiddenException('must be maximum 6 players')
    }
    const maze = this.generateMaze();
    const cards = Object.keys(maze)
      .filter(type => type !== 'JOKERS')
      .reduce((previousValue, currentValue) => {
        const typedCards = maze[currentValue].map(currentNumber => `${currentNumber}-${currentValue}`);
        previousValue.push(...typedCards);
        return previousValue;
      }, []);
      cards.push('RED-JOKER', 'BLACK-JOKER');
      const playersHand = {};
      const disarrayedCards = Array.from([...this.disarray(cards)]);
      let actualPlayer = 1;
      for (let i = 0; i < cards.length; i++) {
        if (playersHand[actualPlayer] === undefined) {
          playersHand[actualPlayer] = [];
        }
        playersHand[actualPlayer].push(disarrayedCards.pop());
        if (actualPlayer === players) {
          actualPlayer = 0;
        }
        actualPlayer++;
      }
    return playersHand;
  }

  private disarray(arr: string[]): Set<string> {
    const newArr = new Set<string>();
    const alreadyTakenIndexes: number[] = [];
    arr.forEach(() => {
      newArr.add(arr[this.nextAvailable(arr.length, alreadyTakenIndexes)]);
    });
    return newArr;
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
