import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    return this.authService.getAuthState$().pipe(
      take(1), 
      map((authState) => !!authState),

      // The boolean of 'authenticated' will be returned (after it's mapped)
      //   but this is for our benefit to do an action as a result as well.
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/login']);
      })
    );
  }
}
