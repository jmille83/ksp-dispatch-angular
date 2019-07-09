import { Component, OnInit } from '@angular/core';
import { Note } from '../../objects/note';
import { NotesService } from '../../services/notes.service';
import { User } from '../../objects/user'

import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  date: moment.Moment = moment();
  inProgressNotes: Note[];
  completedNotes: Note[];
  currentUser: User;
  newNote = new Note();

  timePeriods = [ {text: "Today", value: 0}, 
                  {text: "Last 3 days", value: 1}, 
                  {text: "Last 7 days", value: 2}, 
                  {text: "Last 30 days", value: 3}];

  currentTimePeriod: number = 0;
  
  constructor(private notesService: NotesService, public authService: AuthService) { }

  ngOnInit() {
    this.getNotes();
    
    let ref = this.authService.user$.subscribe((user) => {
      this.currentUser = user;
      ref.unsubscribe();
    });
  }

  getNotes() {
    this.getInProgressNotes(this.getDateRange());
    this.getCompletedNotes(this.getDateRange());
  }

  getDateRange(): Date[] {
    // Based on the currently selected time period, adjust the start date.
    let start = this.date.toDate();
    switch(this.currentTimePeriod) {
      case 0: {
        // Do nothing, it's already set to today.
        break;
      }
      case 1: {
        start.setDate(start.getDate() - 3);
        break;
      }
      case 2: {
        start.setDate(start.getDate() - 7);
        break;
      }
      case 3: {
        start.setDate(start.getDate() - 30);
        break;
      }
    }

    // End will always be today, which will get turned into midnight.
    let end = this.date.toDate();
    let dates = [start, end];
    return dates;
  }

  getInProgressNotes(dates: Date[]) {
    this.notesService.getNotesBetweenIf(dates[0], dates[1], false).subscribe(notes => {
      this.inProgressNotes = notes;
    });
  }

  getCompletedNotes(dates: Date[]) {
    this.notesService.getNotesBetweenIf(dates[0], dates[1], true).subscribe(notes => {
      this.completedNotes = notes;
    });
  }

  addNote() {
    this.notesService.addNote(this.newNote);
    
    // Reset the new note to a blank one.
    this.newNote = new Note();
  }

  toggleNoteComplete(note: Note) {
    note.completed = !note.completed;
    this.notesService.updateNote(note);
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
  }

  onNewTimePeriodClicked(timePeriod: number) {
    if (this.currentTimePeriod === timePeriod) {
      return;
    }
    this.currentTimePeriod = timePeriod;
    
    // Re-get notes in new time period.
    this.getNotes();
  }
}
