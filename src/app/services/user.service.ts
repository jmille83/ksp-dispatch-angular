import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../objects/user';
import { Contact } from '../objects/contact';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService) { }

  getAllUsers(): Observable<any[]> {
    return this.db.collection('users', ref => ref.orderBy('lastName', 'asc')).valueChanges();
  }

  getUsersWhoAreContacts(): Observable<any[]> {
    return this.db.collection('users', ref => ref.where('isContact', '==', true)).valueChanges();
  }

  getPatrollers(): Observable<any[]> {
    return this.db.collection('users', ref => ref.where('isPatroller', '==', true)).valueChanges();
  }

  getPatrollersOrdered(): Observable<any[]> {
    return this.db.collection('users', ref => ref.where('isPatroller', '==', true).orderBy('order', 'desc').orderBy('lastName')).valueChanges();
  }

  updateUser(user: User) {
    let newData = JSON.parse(JSON.stringify(user));
    this.transactionService.writeDataToDocForCollection(newData, user.uid, 'users');
  }

  updateUserFromContact(contact: Contact) {
    this.db.collection('users').doc(contact.userId).valueChanges().pipe(take(1)).subscribe(user => {
      let updatedUser = user as User;
      updatedUser.email = contact.email;
      updatedUser.name = contact.name;
      updatedUser.phone = contact.phone;
      updatedUser.extension = contact.extension;

      let newData = JSON.parse(JSON.stringify(updatedUser));
      this.transactionService.writeDataToDocForCollection(newData, updatedUser.uid, 'users');
    });
  }
}
