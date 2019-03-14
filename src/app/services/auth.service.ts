import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../objects/user';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  private authState$: Observable<firebase.User>;
  user$: Observable<User>;

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.authState$ = firebaseAuth.authState;
    this.authState$.subscribe(
      (user) => {
        if (user) {
          this.user$ = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          console.log("Auth service: " + user.email);
        } else {
          this.user$ = null;
        }
      }
    );
  }

  getAuthState$() {
    return this.authState$;
  }

  isLoggedIn() {
    if (this.user$ == null) {
      console.log("Auth service: NO user");
      return false;
    } else {
      console.log("Auth service: Authed user");
      return true;
    }
  }

  logout() {
    console.log("Auth service: Logging out.")
    this.firebaseAuth.auth.signOut()
    .then((res) => {
      console.log("Auth service: Redirecting to root.");
      this.router.navigate(['/login'])
    });
  }

  loginWithEmail(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.createUserInFirebase(credential.user);
      });
  }

  private createUserInFirebase(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        default: true
      }
    }
    userRef.set(data).catch((err) => console.log(err));
  }

  // Roles
  // Create a function for each type of authorization, or ability, needed.
  //   e.g. isDispatch, isSup, or canRead, canModifySchedule
  // (Consider moving to a new class.
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'sup', 'dispatch', 'line']
    return this.checkAuthorization(user, allowed)
  }
  
  canEdit(user: User): boolean {
    const allowed = ['admin', 'sup', 'dispatch']
    return this.checkAuthorization(user, allowed)
  }

  isDispatch(user: User): boolean {
    const allowed = ['admin', 'sup', 'dispatch'];
    return this.checkAuthorization(user, allowed);
  }
}
