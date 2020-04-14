import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function ifProd<T>(pipe: any) {
  return function(source: Observable<T>): Observable<T> {
    if (environment.production) {
      return source.pipe(pipe);
    }
    return source;
  };
}
