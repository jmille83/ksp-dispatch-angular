import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../objects/user';
import { Contact } from '../objects/contact';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  updateUserFromContact(contact: Contact) {
    this.db.collection('users').doc(contact.userId).valueChanges().pipe(take(1)).subscribe(user => {
      let updatedUser = user as User;
      updatedUser.email = contact.email;
      updatedUser.name = contact.name;
      updatedUser.phone = contact.phone;
      updatedUser.extension = contact.extension;

      let newData = JSON.parse(JSON.stringify(updatedUser));
      this.db.collection('users').doc(updatedUser.uid).set(newData);
    });
  }
}
