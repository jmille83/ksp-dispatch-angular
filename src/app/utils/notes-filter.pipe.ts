import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../objects/note';

@Pipe({
  name: 'notesFilter'
})
export class NotesFilterPipe implements PipeTransform {

  transform(notes: Note[], completed: boolean): Note[] {
    if (!notes) return notes;

    return notes.filter(note => note.completed == completed);
  }

}
