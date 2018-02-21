import { Component, OnInit, Input } from '@angular/core';

import { Record } from '../record';
import { RecordsService } from '../records.service';
import { Patroller } from '../patroller'
import { PatrollerService } from '../patroller.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {

  record: Record = new Record();
  
  equipments = [
    {value: 'Skier'},
    {value: 'Snowboarder'},
    {value: 'Tele'}
  ];

  patrollers: Patroller[];

  constructor(private recordsService: RecordsService, private patrollerService: PatrollerService) { }

  ngOnInit() {
    this.getPatrollers();
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }

  onSubmitButtonClick() {
    // We can check if the record has an id/timestamp here.
    // If so, it's being edited, so just update record (new Service function).
    // If not, timestamp and id will be set by Service with addRecord.

    // Send it away.
    this.recordsService.addRecord(this.record);

    // Clear form.
    this.record = new Record();

    // Make sure everything is deselected.
    document.getElementById("submitRecordButton").focus();
    document.getElementById("submitRecordButton").blur();
  }
}
