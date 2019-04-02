import { Component, OnInit, Input, Inject } from '@angular/core';

import { Record } from '../../objects/record';
import { RecordsService } from '../../services/records.service';
import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecordDetailDialogComponent } from '../record-detail-dialog/record-detail-dialog.component';

export interface DialogData {
  record: Record;
}

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {

  @Input() record: Record;
  
  equipments = [
    {value: 'Skier'},
    {value: 'Snowboarder'},
    {value: 'Tele'},
    {value: 'Other'}
  ];

  patrollers: Patroller[];

  constructor(private recordsService: RecordsService, private patrollerService: PatrollerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getPatrollers();
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }

  onRadioButtonChange() {
    var container = document.getElementById("record-detail-container");
    
    switch(this.record.peak) {
      case "North": {
        container.style.backgroundColor = "#e8eefc";
        break;
      }
      case "Outback": {
        container.style.backgroundColor = "#def2de";
        break;
      }
      default: {
        // This will include "Frontside".
        container.style.backgroundColor = "white";
        break;
      }
    }
  }

  onSubmitButtonClick() {
    // We can check if the record has an id/timestamp here.
    // If so, it's being edited, so just update record.
    // If not, timestamp and id will be set by Service with addRecord.
    if (this.record.id != null) {
      this.recordsService.updateRecord(this.record);
    } else {
      this.recordsService.addRecord(this.record);
    }

    this.resetForm();
  }

  onClearButtonClick() {
    this.resetForm();
  }

  resetForm() {
    // Clear form.
    this.record = new Record();

    // Make sure everything is deselected.
    document.getElementById("submitRecordButton").focus();
    document.getElementById("submitRecordButton").blur();

    // Reset background color.
    this.onRadioButtonChange();
  }

  onMoreInfoButtonClicked() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordDetailDialogComponent, {
      data: {record: this.record}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
