import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatrolGuard implements CanActivate {

// This guard prevents non-patrol members who signed up with an email
//  from accessing any other information.

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.user$) {
      console.log("User exists, checking roles.");
      return this.authService.user$.pipe(
      
        // Take the next available value of user.
        take(1),
  
        // Turn it into a boolean that checks if the user exists and if it has the admin role.
        map(user => user && user.roles.line ? true : false),
  
        // That boolean will be returned like CanActivate wants, this log is just for our sake.
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/nowhere']);
          }
        })
      );
    } else {
      return  new Observable<boolean>(observer => observer.next(false));
    }
  }
}
