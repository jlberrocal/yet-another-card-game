import { Observable, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

export function delayedConcat<T>(time: number) {
  return function(source: Observable<T>) {
    return source.pipe(concatMap(c =>
      of(c)
        .pipe(
          delay(time)
        )
    ));
  };
}
