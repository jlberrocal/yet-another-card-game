import { Logger } from '@nestjs/common';

export function LoggerFactory() {
  return function decoration(target: any, property: string) {
    target[property] = new Logger(target.constructor.name);
  }
}
