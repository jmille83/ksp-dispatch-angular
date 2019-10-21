import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../objects/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  private authState$: Observable<firebase.User>;
  user$: Observable<User>;
  private currentUser: User;

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.authState$ = firebaseAuth.authState;
    this.authState$.subscribe((user) => {
        if (user) {
          this.user$ = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          this.afs.doc<User>(`users/${user.uid}`).ref.get().then(userSnapshot => {
            this.currentUser = userSnapshot.data() as User;           
            console.log("Auth service: " + user.email + "\n" + this.currentUser.firstName);
          });
        } else {
          this.user$ = null;
        }
      }
    );
  }

  getAuthState$() {
    return this.authState$;
  }

  getCurrentUser() {
    return this.currentUser;
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
    this.currentUser = null;
    this.firebaseAuth.auth.signOut()
    .then((res) => {
      console.log("Auth service: Redirecting to root.");
      this.router.navigate(['/login'])
    });
  }

  loginWithEmail(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email, password, firstName, lastName, phone) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.createUserInFirebase(credential.user, firstName, lastName, phone);
      });
  }

  private createUserInFirebase(user: firebase.User, firstName: string, lastName: string, phone: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      displayName: lastName,
      name: firstName + ' ' + lastName,
      phone: phone,
      extension: "",
      isContact: true,
      isPatroller: true,
      order: 0,
      roles: {
        default: true
      }
    }
    // The 'default' role allows the user to write themself to the Firestore (with set()).
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

  isFullDispatch(user: User) {
    if (!user) return false;
    if (user.roles['dispatch']) {
      if (user.roles['aux-dispatch']) {
        return false;
      }
      return true;
    }
    return false;
  }

  isSup(user: User): boolean {
    const allowed = ['admin', 'sup'];
    return this.checkAuthorization(user, allowed);
  }

  isSpecialist(user: User): boolean {
    const allowed = ['admin', 'sup', 'specialist'];
    return this.checkAuthorization(user, allowed);
  }

  canNorthPeak(user: User): boolean {
    const allowed = ['admin', 'sup', 'dispatch', 'north-peak'];
    return this.checkAuthorization(user, allowed);
  }

  canOutback(user: User): boolean {
    const allowed = ['admin', 'sup', 'dispatch', 'outback'];
    return this.checkAuthorization(user, allowed);
  }
}
