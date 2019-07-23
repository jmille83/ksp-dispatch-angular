import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class PatrollerService {

  constructor(private db: AngularFirestore) { }

  getAllPatrollers(): Observable<any[]> {
    return this.db.collection('patrollers', ref => ref.orderBy('order').orderBy('name')).valueChanges();
  }
}
