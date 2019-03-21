import { Injectable } from '@angular/core';
import { Closing } from '../objects/closing';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { ClosingRecord } from '../objects/closing-record';

@Injectable({
  providedIn: 'root'
})
export class ClosingsService {

  constructor(private db: AngularFirestore) { }

  getClosingsListForPeak(peak: string): Observable<Closing[]> {
    return this.db.collection<Closing>('closings', ref => ref.where('peak', '==', peak).orderBy('order')).valueChanges();
  }

  getClosingRecordsForPeakAndDate(peak: string, date: string): Observable<ClosingRecord[]> {
    return this.db.collection('closing-records').doc(date).collection<ClosingRecord>(peak).valueChanges();
  }

  submitClosingRecords(closingRecords: ClosingRecord[], peak: string, date:string) {
    let openingRecordsCollection = this.db.collection('closing-records').doc(date)
        .collection<ClosingRecord>(peak);
    
    closingRecords.forEach(record => {
      var newData = JSON.parse(JSON.stringify(record));
      openingRecordsCollection.doc(record.id).set(newData);  
    });
  }
}
