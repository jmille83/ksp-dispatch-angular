import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

import { Record } from '../../objects/record'
import { RecordsService } from '../../services/records.service';
import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  @Output() onRecordClicked = new EventEmitter<Record>();
  records: Record[];
  patrollers: Patroller[];
  date: moment.Moment = moment();
  total1050s = 0;
  totalTaxis = 0;

  constructor(private recordsService: RecordsService, private patrollerService: PatrollerService) { }

  ngOnInit() {
    this.getRecords();
    this.getPatrollers();
  }

  getRecords(): void {
    let start = this.date.toDate();
    this.recordsService.getRecordsForDay(start).subscribe(records => {
      this.records = records
      this.countRecords();
    });
  }

  countRecords() {
    this.total1050s = 0;
    this.totalTaxis = 0;
    this.records.forEach(record => {
      if (record.type === "10-50") {
        this.total1050s++;
      } else {
        this.totalTaxis++;
      } 
    });
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }

  onRecordClick(record: Record) {
    this.onRecordClicked.emit(record);
  }

  onDateChanged() {
    this.getRecords();
  }
}
