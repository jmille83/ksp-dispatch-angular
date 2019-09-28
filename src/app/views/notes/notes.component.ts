import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../objects/note';
import { NotesService } from '../../services/notes.service';
import { User } from '../../objects/user'

import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  date: moment.Moment = moment();
  notes: Note[];
  user: User;
  newNote = new Note();
  hasCompleted: boolean = false;
  hasInProgress: boolean = false;

  timePeriods = [ {text: "Today", value: 0}, 
                  {text: "Last 3 days", value: 1}, 
                  {text: "Last 7 days", value: 2}, 
                  {text: "Last 30 days", value: 3}];

  currentTimePeriod: number = 0;

  subscription: Subscription = new Subscription();
  
  constructor(private notesService: NotesService, public authService: AuthService) { }

  ngOnInit() {
    this.subscription.add(
      this.authService.user$.subscribe((user) => {
          this.user = user;
      })
    );
    // This takes the current value of user from auth service. 
    // If it updates, the subscription will update it.
    this.user = this.authService.getCurrentUser();
    this.getNotes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getNotes() {
    let dates: Date[] = this.getDateRange();

    this.subscription.add(
    this.notesService.getNotesBetween(dates[0], dates[1]).subscribe(notes => {
      this.notes = notes;
      this.hasCompleted = this.notes.some(note => note.completed == true);
      this.hasInProgress = this.notes.some(note => note.completed == false);
    }));
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

  addNote() {
    this.notesService.addNote(this.newNote);
    
    // Reset the new note to a blank one.
    this.newNote = new Note();
  }

  toggleNoteComplete(note: Note) {
    note.completed = !note.completed;
    
    // If, after updating, it's complete, add user's initials.
    if (note.completed) {
      console.log(this.user.displayName);
      note.completersName = this.user.displayName;
    }
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
