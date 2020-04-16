import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function logResponse<T>() {
  return function(source: Observable<any>) {
    return source.pipe(
      tap(value => console.log(value))
    );
  }
}
