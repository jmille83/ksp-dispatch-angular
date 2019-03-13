import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment';

import { Opening } from '../objects/opening';
import { OpeningRecord } from '../objects/opening-record';

@Injectable()
export class OpeningsService {

  constructor(private db: AngularFirestore) { }

  getOpeningsListForPeak(peak: string): Observable<Opening[]> {
    return this.db.collection<Opening>('openings', ref => ref.where('peak', '==', peak)).valueChanges();
  }

  getOpeningRecordsForPeakAndDate(peak: string, date: string): Observable<OpeningRecord[]> {
    return this.db.collection('opening-records').doc(date).collection<OpeningRecord>(peak).valueChanges();
  }
  
  submitOpeningRecords(openingRecords: OpeningRecord[], peak: string, date:string) {
    let openingRecordsCollection = this.db.collection('opening-records').doc(date)
        .collection<OpeningRecord>(peak);
    
    openingRecords.forEach(record => {
      var newData = JSON.parse(JSON.stringify(record));
      openingRecordsCollection.doc(record.id).set(newData);  
    });
  }
}
