import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { take } from 'rxjs/operators';
import { Contact } from '../../objects/contact';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { ContactEditComponent } from '../dialogs/contact-edit/contact-edit.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  contacts: Contact[];
  tableDataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'extension', 'phone', 'email'];
  displayedColumnsWithEdit: string[] = ['name', 'edit', 'extension', 'phone', 'email'];

  constructor(private directoryService: DirectoryService, 
    private authService: AuthService, 
    private userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.directoryService.getAllContacts().pipe(take(1)).subscribe(contacts => {
      this.contacts = contacts as Contact[];

      // Add all the users to the directory.
      this.userService.getUsersWhoAreContacts().pipe(take(1)).subscribe(users => {
        users.forEach(user => {
          let newContact = user as Contact;
          newContact.userId = user.uid;
          this.contacts.push(newContact);
        });
        // Sort the new ones in by name.
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.tableDataSource = new MatTableDataSource(this.contacts);
      });
    });
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  isSup() {
    return this.authService.isSup(this.authService.getCurrentUser());
  }

  onEditButtonClicked(contact: Contact) {
    this.dialog.open(ContactEditComponent, {
      data: { contact: contact}
    });
  }

  getDisplayedColumns() {
    if (this.isSup()) {
      return this.displayedColumnsWithEdit;
    } else {
      return this.displayedColumns;
    }
  }
}

export interface DialogData {
  contact: Contact;
}
