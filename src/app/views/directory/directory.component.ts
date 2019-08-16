import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { take } from 'rxjs/operators';
import { Contact } from '../../objects/contact';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  contacts: Contact[];
  tableDataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'extension', 'phone', 'email'];

  constructor(private directoryService: DirectoryService) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.directoryService.getAllContacts().pipe(take(1)).subscribe(contacts => {
      this.contacts = contacts as Contact[];
    });

    // Add all the users to the directory.
    this.directoryService.getAllUsers().pipe(take(1)).subscribe(users => {
      users.forEach(user => {
        this.contacts.push(user as Contact);
      });
      // Sort the new ones in by name.
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
      this.tableDataSource = new MatTableDataSource(this.contacts);
    });
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }
}
