import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import { Opening } from './opening';

@Injectable()
export class OpeningsService {

  constructor(private db: AngularFirestore) { }

  getOpeningsForPeak(peak: string): Observable<Opening[]> {
    return this.db.collection<Opening>('openings', ref => ref.where('peak', '==', peak)).valueChanges();
  }
}
