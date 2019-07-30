import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private db: AngularFirestore) { }

  getAllContacts(): Observable<any[]> {
    return this.db.collection('contacts').valueChanges();
  }
}
