import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function key<T>(value: string) {
  return function pipeOperator(source: Observable<any>): Observable<T> {
    return source.pipe(
      map(obj => {
        if (obj.hasOwnProperty(value)) {
          return obj[value];
        } else {
          throw new Error(`object don't contain a ${value} property`)
        }
      })
    )
  }
}
