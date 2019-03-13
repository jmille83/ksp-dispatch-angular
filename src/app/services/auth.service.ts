import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private authState$: Observable<firebase.User>;
  private user: firebase.User = null;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.authState$ = firebaseAuth.authState;
    this.authState$.subscribe(
      (user) => {
        if (user) {
          this.user = user;
          console.log("Auth service: " + this.user.email);
        } else {
          this.user = null;
        }
      }
    );
  }

  getAuthState$() {
    return this.authState$;
  }

  isLoggedIn() {
    if (this.user == null) {
      console.log("Auth service: NO user");
      return false;
    } else {
      console.log("Auth service: Authed user");
      return true;
    }
  }

  logout() {
    this.firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

  loginWithEmail(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
