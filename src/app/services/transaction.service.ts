import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaction, TransactionType } from '../objects/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private db: AngularFirestore, private authService: AuthService) { }

  writeDataToDocForCollection(data: any, docId: string, collection: string) {
    this.db.collection(collection).doc(docId).set(data);
    
    let transaction = new Transaction();
    transaction.data = data;
    transaction.timestamp = new Date().getTime();
    transaction.userId = this.authService.getCurrentUser().uid;
    transaction.type = TransactionType.WRITE;
    
    let dataJson = JSON.parse(JSON.stringify(transaction));

    this.db.collection('transaction-log').add(dataJson);
  }

  deleteDocInCollection(docId: string, collection: string, object: any) {
    this.db.collection(collection).doc(docId).delete();

    let transaction = new Transaction();
    transaction.data = object;
    transaction.timestamp = new Date().getTime();
    transaction.userId = this.authService.getCurrentUser().uid;
    transaction.type = TransactionType.DELETE;
    
    let dataJson = JSON.parse(JSON.stringify(transaction));

    this.db.collection('transaction-log').add(dataJson);    
  }

}
