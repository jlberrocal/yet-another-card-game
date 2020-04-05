import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto, RegisterDto } from '@innoware/api-interfaces';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UiService } from '../../shared/services/ui.service';
import { handleAuth } from '../rxjs-operators/handle-auth';

@Injectable()
export class LoginService {
  private readonly url = `${environment.api}/auth`;
  private readonly options = {
    responseType: 'text' as any
  };

  constructor(private http: HttpClient, private uiService: UiService) {
  }

  login(dto: LoginDto): Observable<boolean> {
    this.uiService.showSpinner();
    return this.http.post<string>(`${this.url}/login`, dto, this.options).pipe(
      handleAuth(this.uiService)
    );
  }

  register(dto: RegisterDto): Observable<boolean> {
    this.uiService.showSpinner();
    return this.http.post<string>(`${this.url}/register`, dto, this.options)
      .pipe(
        handleAuth(this.uiService)
      );
  }
}
