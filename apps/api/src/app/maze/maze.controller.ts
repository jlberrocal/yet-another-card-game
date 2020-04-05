import { Controller, ForbiddenException, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { Card, CardNumbers, CardTypes, Jokers } from '@innoware/api-interfaces';
import { Server } from 'socket.io';
import { SocketsGateway } from '../sockets/sockets.gateway';

@Controller('maze')
export class MazeController {

  constructor(private readonly gateway: SocketsGateway) {
  }

  @Get(':players')
  generateHands(@Param('players', ParseIntPipe) players: number): ArrayLike<Card[]> {

    if (players < 3) {
      throw new ForbiddenException('must be at least 3 players');
    } else if (players > 6) {
      throw new ForbiddenException('must be maximum 6 players');
    }

    const maze = this.disarray(this.generateMaze());
    this.gateway.server.emit('maze generation', maze);

    let index = 0;
    return maze.reduce((hands, card) => {
      index++;
      if (!hands[index]) {
        hands[index] = [];
      }
      hands[index].push(card);

      if (index === players) {
        index = 0;
      }

      return hands;
    }, { length: players });
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
          number
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
