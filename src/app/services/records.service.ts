import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'

import { Record } from '../objects/record'
import { TransactionService } from './transaction.service';

@Injectable()
export class RecordsService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService) { }

  getRecordsForDay(day: Date): Observable<any[]> {
    let start = day;
    start.setHours(0);
    start.setMinutes(0);
    let end = new Date(start);
    end.setHours(23);
    end.setMinutes(59);
    return this.db.collection('records', ref => ref.where('timeReported', '>', start.getTime())
                                                    .where('timeReported', '<', end.getTime())
                                                    .orderBy('timeReported', 'desc')).valueChanges();
  }

  get1050sForDay(day: Date): Observable<any[]> {
    let start = day;
    start.setHours(0);
    start.setMinutes(0);
    let end = new Date(start);
    end.setHours(23);
    end.setMinutes(59);
    return this.db.collection('records', ref => ref.where('timeReported', '>', start.getTime())
                                                    .where('timeReported', '<', end.getTime())
                                                    .where('type', '==', '10-50')
                                                    .orderBy('timeReported', 'desc')).valueChanges();
  }

  addRecord(record: Record) {
    // Create a unique id in Firebase.
    record.id = this.db.createId();
    
    record.timeReported = new Date().getTime();
    record.timeReportedString = new Date().toLocaleTimeString();

    // Firebase needs data as plain JSON.
    var data = JSON.parse(JSON.stringify(record));

    this.transactionService.writeDataToDocForCollection(data, record.id, 'records');
  }

  updateRecord(record: Record) {
    // Firebase needs data as plain JSON.
    var newData = JSON.parse(JSON.stringify(record));

    this.transactionService.writeDataToDocForCollection(newData, record.id, 'records');
  }

  deleteRecord(record: Record) {
    this.transactionService.deleteDocInCollection(record.id, 'records', record);
  }
}
