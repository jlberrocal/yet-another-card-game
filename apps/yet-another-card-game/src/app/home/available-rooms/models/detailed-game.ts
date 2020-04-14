import { GameDto } from '@innoware/api-interfaces';

export type DetailedGame = GameDto & { details: boolean };
