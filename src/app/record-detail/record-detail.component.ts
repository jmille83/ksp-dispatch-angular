import { Component, OnInit, Input } from '@angular/core';

import { Record } from '../record';
import { RecordsService } from '../records.service';

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

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
  }

  onSubmitButtonClick() {
    // Timestamp and id will be set by service who has access to database.

    // Send it away.
    this.recordsService.addRecord(this.record);

    // Clear form.
    this.record = new Record();

    // Make sure everything is deselected.
    document.getElementById("submitRecordButton").focus();
    document.getElementById("submitRecordButton").blur();
  }
}
