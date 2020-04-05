import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoginGuard implements CanActivate {
  constructor(private location: Location, private jwt: JwtHelperService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.jwt.tokenGetter();
    const isExpired = this.jwt.isTokenExpired(token);
    if (token && !isExpired) {
      this.location.back();
      return false;
    }
    localStorage.clear();
    return true;
  }

}
