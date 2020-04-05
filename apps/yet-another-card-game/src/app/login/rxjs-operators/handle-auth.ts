import { UiService } from '../../shared/services/ui.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hideSpinner } from '../../shared/rxjs-operators/hideSpinner';

export function handleAuth(service: UiService) {
  return function pipeHandling(source: Observable<string>): Observable<boolean> {
    return source.pipe(
      map((token: string) => {
        localStorage.setItem('token', token);
        return true;
      }),
      hideSpinner(service),
      catchError(() => of(false))
    );
  };
}
