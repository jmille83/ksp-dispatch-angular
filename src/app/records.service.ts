import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import { Record, Gear } from './record'

@Injectable()
export class RecordsService {

  constructor(private db: AngularFirestore) { }

  getRecords(): Observable<any[]> {
    return this.db.collection('records', ref => ref.orderBy('timeReported', 'desc')).valueChanges();
  }

  addRecord(name: string, gear: Gear, chiefComplaint: string) {
    const id = this.db.createId();
    const record: Record = { id, name, gear, chiefComplaint};
    this.db.collection('records').add(record);
  }
}
