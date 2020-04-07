import { Module } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway';
import { GameGateway } from './game.gateway';

export const gateways = [SocketsGateway, GameGateway];

@Module({
  providers: gateways,
  exports: gateways
})
export class SocketsModule {}
