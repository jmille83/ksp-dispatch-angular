import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/objects/contact';
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
      this.tableDataSource = new MatTableDataSource(this.contacts);
    });
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }
}
