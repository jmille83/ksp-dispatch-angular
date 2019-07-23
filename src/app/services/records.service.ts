import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'

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
    
    record.timeReported = new Date().getTime();
    record.timeReportedString = new Date().toLocaleTimeString();

    // This label is for the side of records. Notably 10-50s don't get one.
    if (record.type === "Taxi" || record.type === "Non-event") {
      record.typeLabel = record.type;
    }

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
