import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'
import { LinkGroup } from '../objects/link-group';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private db: AngularFirestore) { }

  getUsefulLinks(): Observable<any[]> {
    return this.db.collection("useful-links-groups").valueChanges();
  }
}
