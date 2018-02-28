import { Component, OnInit } from '@angular/core';

import { Record } from '../record'
import { RecordsService } from '../records.service';
import { Patroller } from '../patroller'
import { PatrollerService } from '../patroller.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  records: Record[];
  patrollers: Patroller[];

  constructor(private recordsService: RecordsService, private patrollerService: PatrollerService) { }

  ngOnInit() {
    this.getRecords();
    this.getPatrollers();
  }

  getRecords(): void {
    this.recordsService.getRecords().subscribe(records => this.records = records);
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }
}
