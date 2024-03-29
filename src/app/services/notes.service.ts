import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'

import { Note } from '../objects/note'
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService) { }

  getAllIncompleteNotes(): Observable<any[]> {
    return this.db.collection('notes', ref => ref.where('completed', '==', false)
                                                  .orderBy('timeCreated', 'desc')).valueChanges();
  }

  getCompletedNotesBetween(day1: Date, day2: Date): Observable<any[]> {
    
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
    return this.db.collection('notes', ref => ref.where('timeCompleted', '>', start.getTime())
                                                    .where('timeCompleted', '<', end.getTime())
                                                    .where('completed', '==', true)
                                                    .orderBy('timeCompleted', 'desc')).valueChanges();
  }

  addNote(note: Note) {
    // Create a unique id in Firebase.
    note.id = this.db.createId();
    
    note.timeCreated = new Date().getTime();
    note.completed = false;
    
    // Firebase needs data as plain JSON.
    var data = JSON.parse(JSON.stringify(note));

    this.transactionService.writeDataToDocForCollection(data, note.id, 'notes');
  }

  updateNote(note: Note) {
    var data = JSON.parse(JSON.stringify(note));
    
    this.transactionService.writeDataToDocForCollection(data, note.id, 'notes');
  }

  deleteNote(note: Note) {
    this.transactionService.deleteDocInCollection(note.id, 'notes', note);
  }
}
