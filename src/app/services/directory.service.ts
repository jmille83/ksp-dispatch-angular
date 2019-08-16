import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../objects/contact';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private db: AngularFirestore) { }

  getAllContacts(): Observable<any[]> {
    return this.db.collection('contacts', ref => ref.orderBy('name', 'asc')).valueChanges();
  }

  getAllUsers(): Observable<any[]> {
    return this.db.collection('users', ref => ref.where('isContact', '==', true)).valueChanges();
  }

  getAllContactsWithIds() {
    return this.db.collection('contacts').snapshotChanges();
  }

  addContact(contact: Contact) {
    contact.id = this.db.createId();
    let newData = JSON.parse(JSON.stringify(contact));
    this.db.collection('contacts').doc(contact.id).set(newData);
  }

  updateContact(contact: Contact) {
    let newData = JSON.parse(JSON.stringify(contact));
    this.db.collection('contacts').doc(contact.id).set(newData);
  }

  deleteContact(contact: Contact) {
    this.db.collection('contacts').doc(contact.id).delete();
  }
}
