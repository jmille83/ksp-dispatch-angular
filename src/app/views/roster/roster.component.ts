import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { User } from '../../objects/user';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { RosterEditComponent } from '../dialogs/roster-edit/roster-edit.component';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  users: User[];
  tableDataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'roles'];

  constructor(private authService: AuthService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getAllUsers().pipe(take(1)).subscribe(users => {
      this.users = users;
      this.tableDataSource = new MatTableDataSource(this.users);
    });
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditButtonClicked(user: User) {
    this.dialog.open(RosterEditComponent, {
      data: { user: user}
    });
  }

  isSup() {
    return this.authService.isSup(this.authService.getCurrentUser());
  }
}

export interface DialogData {
  user: User;
}
