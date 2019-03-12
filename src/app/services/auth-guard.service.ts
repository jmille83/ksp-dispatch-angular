import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If we drop through the logged-in check, navigate to login.
    this.router.navigate(['/']);
    return false;
  }
}
