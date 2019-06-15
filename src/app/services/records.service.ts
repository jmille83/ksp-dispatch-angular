import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import * as firebase from 'firebase';

import { Record } from '../objects/record'

@Injectable()
export class RecordsService {

  constructor(private db: AngularFirestore) { }

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

  addRecord(record: Record) {
    // Create a unique id in Firebase.
    record.id = this.db.createId();
    
    //let dateNow = firebase.firestore.FieldValue.serverTimestamp();
    record.timeReported = new Date().getTime();

    // Firebase needs data as plain JSON.
    var data = JSON.parse(JSON.stringify(record));

    this.db.collection('records').doc(record.id).set(data);
  }

  updateRecord(record: Record) {
    // Firebase needs data as plain JSON.
    var newData = JSON.parse(JSON.stringify(record));
    
    this.db.collection('records').doc(record.id).set(newData);
  }

  deleteRecord(record: Record) {
    this.db.collection('records').doc(record.id).delete();
  }
}
