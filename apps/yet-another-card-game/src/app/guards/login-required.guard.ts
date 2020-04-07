import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginRequiredGuard implements CanActivate {
  constructor(private router: Router, private jwt: JwtHelperService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.jwt.tokenGetter();
    const isExpired = this.jwt.isTokenExpired(token);
    if (!token || isExpired) {
      this.router.navigateByUrl('/login')
        .then(() => localStorage.clear())
        .catch((err) => console.log('unable to redirect to login', err));
      return false;
    }
    return true;
  }

}
