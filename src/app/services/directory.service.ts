import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../objects/contact';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService) { }

  getAllContacts(): Observable<any[]> {
    return this.db.collection('contacts', ref => ref.orderBy('name', 'asc')).valueChanges();
  }

  addContact(contact: Contact) {
    contact.id = this.db.createId();
    let newData = JSON.parse(JSON.stringify(contact));
    this.transactionService.writeDataToDocForCollection(newData, contact.id, 'contacts');
  }

  updateContact(contact: Contact) {
    let newData = JSON.parse(JSON.stringify(contact));
    this.transactionService.writeDataToDocForCollection(newData, contact.id, 'contacts');
  }

  deleteContact(contact: Contact) {
    this.transactionService.deleteDocInCollection(contact.id, 'contacts', contact);
  }
}
