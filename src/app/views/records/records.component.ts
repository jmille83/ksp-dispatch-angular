import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import * as moment from 'moment';

import { Record } from '../../objects/record'
import { RecordsService } from '../../services/records.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { RecordDeleteDialogComponent } from '../dialogs/record-delete-dialog/record-delete-dialog.component';
import { RecordEditTimeDialogComponent } from '../dialogs/record-edit-time-dialog/record-edit-time-dialog.component';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../objects/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit, OnDestroy {

  @Output() onRecordClicked = new EventEmitter<Record>();
  records: Record[] = [];
  editTimeRecord: Record;
  patrollers: User[];
  date: moment.Moment = moment();
  total1050s = 0;
  totalTaxis = 0;

  subscription: Subscription = new Subscription();
  
  constructor(private recordsService: RecordsService, private userService: UserService,
              public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getRecords();
    this.getPatrollers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRecords(): void {
    let start = this.date.toDate();
    this.subscription.add(this.recordsService.getRecordsForDay(start).subscribe(records => {
      this.records = records
      this.countRecords();
    }));
  }

  // Just a basic reporting tool.
  countRecords() {
    this.total1050s = 0;
    this.totalTaxis = 0;
    this.records.forEach(record => {
      if (record.type === "10-50") {
        this.total1050s++;
      } else if (record.type === "Taxi") {
        this.totalTaxis++;
      }
    });
  }

  getPatrollers(): void {
    this.userService.getPatrollers()
    .pipe(take(1))
    .subscribe(patrollers => {
      this.patrollers = patrollers
    });
  }

  onRecordClick(record: Record) {
    this.onRecordClicked.emit(record);
  }

  onDateChanged() {
    this.getRecords();
  }

  onDeleteButtonClicked(record: Record) {
    const dialogRef = this.dialog.open(RecordDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recordsService.deleteRecord(record);
      }
    });
  }

  onEditTimeButtonClicked(record: Record) {
    const dialogRef = this.dialog.open(RecordEditTimeDialogComponent, {
      data: {record: record}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recordsService.updateRecord(record);
      }
    });
  }

  onTraumaActivationButtonClicked(record: Record) {
    record.traumaActivated = !record.traumaActivated;
    this.recordsService.updateRecord(record);
  }

  on1033ButtonClicked(record: Record) {
    record.is1033 = !record.is1033;
    this.recordsService.updateRecord(record);
  }

  goTo1033(record: Record) {
    this.router.navigateByUrl("/1033/" + record.id);
  }
}
