import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiftEvacService {

  constructor(private db: AngularFirestore) { }

  getAllLiftEvacs(): Observable<any[]> {
    return this.db.collection('lift-evacs', ref => ref.orderBy('date', 'desc')).valueChanges();
  }

  getLiftEvacWithId(id: string): Observable<any[]> {
    return this.db.collection('lift-evacs', ref => ref.where("id", "==", id)).valueChanges();
  }
}
