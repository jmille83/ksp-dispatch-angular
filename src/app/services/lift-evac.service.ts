import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LiftEvac } from '../objects/lift-evac';

@Injectable({
  providedIn: 'root'
})
export class LiftEvacService {

  constructor(private db: AngularFirestore) { }

  getAllLifts(): Observable<any[]> {
    return this.db.collection('lifts').valueChanges();
  }

  getAllLiftEvacs(): Observable<any[]> {
    return this.db.collection('lift-evacs', ref => ref.orderBy('startTime', 'desc')).valueChanges();
  }

  getLiftEvacWithId(id: string): Observable<any[]> {
    return this.db.collection('lift-evacs', ref => ref.where("id", "==", id)).valueChanges();
  }

  addLiftEvac(lift: string, stopTime: number, stopTimeString: string): string {
    let evac = new LiftEvac();
    evac.id = this.db.createId();
    evac.stopTime = stopTime;
    evac.date = new Date().toLocaleDateString();
    evac.lift = lift;
    evac.stopTimeString = stopTimeString;
    
    let data = JSON.parse(JSON.stringify(evac));
    this.db.collection('lift-evacs').doc(evac.id).set(data);
    return evac.id;
  }

  updateLiftEvac(evac: LiftEvac) {
    let data = JSON.parse(JSON.stringify(evac));
    this.db.collection('lift-evacs').doc(evac.id).set(data);
  }
}
