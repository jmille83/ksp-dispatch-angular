import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'

import { Note } from '../objects/note'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private db: AngularFirestore) { }

  getNotesBetween(day1: Date, day2: Date): Observable<any[]> {
    
    // Set the days to starting at midnight and ending at 11:59pm.
    let start = day1;
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    let end = day2;
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    // Calling .getTime() converts to milliseconds which matches how timeCreated is stored.
    return this.db.collection('notes', ref => ref.where('timeCreated', '>', start.getTime())
                                                    .where('timeCreated', '<', end.getTime())
                                                    .orderBy('timeCreated', 'desc')).valueChanges();
  }

  addNote(note: Note) {
    // Create a unique id in Firebase.
    note.id = this.db.createId();
    
    note.timeCreated = new Date().getTime();
    note.completed = false;
    
    // Firebase needs data as plain JSON.
    var data = JSON.parse(JSON.stringify(note));

    this.db.collection('notes').doc(note.id).set(data);
  }

  updateNote(note: Note) {
    var data = JSON.parse(JSON.stringify(note));
    this.db.collection('notes').doc(note.id).set(data);
  }

  deleteNote(note: Note) {
    this.db.collection('notes').doc(note.id).delete();
  }
}
