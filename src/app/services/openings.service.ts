import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'

import { Opening } from '../objects/opening';
import { OpeningRecord } from '../objects/opening-record';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionType } from '../objects/transaction';
import { AuthService } from './auth.service';

@Injectable()
export class OpeningsService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService, private authService: AuthService) { }

  getListForTypeAndPeak(type: string, peak: string): Observable<Opening[]> {
    if (peak === "frontside-day") {
      return this.db.collection<Opening>(type, ref => ref.where('day', '==', true).orderBy('order')).valueChanges();
    } else if (peak === "frontside-night") {
      return this.db.collection<Opening>(type, ref => ref.where('night', '==', true).orderBy('order')).valueChanges();
    } else {
      return this.db.collection<Opening>(type, ref => ref.where('peak', '==', peak).orderBy('order')).valueChanges();
    }
  }

  getPersonnelOpeningsListForPeak(peak: string): Observable<Opening[]> {
    return this.db.collection<Opening>('openings-personnel', ref => ref.where('peak', '==', peak).orderBy('order')).valueChanges();
  }

  getInitialRecordsForTypeAndPeakAndDate(type: string, peak: string, date: string): Observable<OpeningRecord[]> {
    return this.db.collection(type + '-records').doc(date).collection<OpeningRecord>(peak, ref => ref.orderBy('order')).valueChanges();
  }

  getChangesForTypeAndPeakAndDate(type: string, peak: string, date: string) {
    return this.db.collection(type + '-records').doc(date).collection<OpeningRecord>(peak).stateChanges(['modified']);
  }
  
  submitRecordsForTypeAndPeakAndDate(openingRecords: OpeningRecord[], type: string, peak: string, date:string) {
    let collection = this.db.collection(type + '-records').doc(date).collection<OpeningRecord>(peak);
    let data = {
      'type': type,
      'peak': peak,
      'date': date
    }
    this.createAuxiliaryTransactionWithData(data);

    openingRecords.forEach(record => {
      var newData = JSON.parse(JSON.stringify(record));
      collection.doc(record.id).set(newData);
    });
  }

  updateOpeningWithType(opening: Opening, type: string) {
    var newData = JSON.parse(JSON.stringify(opening));
    this.transactionService.writeDataToDocForCollection(newData, opening.id, type);
  }

  createAuxiliaryTransactionWithData(data: any) {
    let transaction = new Transaction();
    transaction.data = data;
    transaction.timestamp = new Date().getTime();
    transaction.userId = this.authService.getCurrentUser().uid;
    transaction.type = TransactionType.WRITE;
    
    let dataJson = JSON.parse(JSON.stringify(transaction));

    this.db.collection('transaction-log').add(dataJson);    
  }
}
