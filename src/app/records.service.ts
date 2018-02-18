import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import * as firebase from 'firebase';

import { Record } from './record'

@Injectable()
export class RecordsService {

  constructor(private db: AngularFirestore) { }

  getRecords(): Observable<any[]> {
    return this.db.collection('records', ref => ref.orderBy('timeReported', 'desc')).valueChanges();
  }

  addRecord(record: Record) {
    // Create a unique id in Firebase.
    record.id = this.db.createId();
    
    //let dateNow = firebase.firestore.FieldValue.serverTimestamp();
    record.timeReported = new Date().getTime();

    // Firebase needs data as plain JSON.
    var data = JSON.parse(JSON.stringify(record));

    this.db.collection('records').add(data);
  }
}
