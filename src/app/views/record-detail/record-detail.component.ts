import { Component, OnInit, Input, Inject } from '@angular/core';

import { Record } from '../../objects/record';
import { RecordsService } from '../../services/records.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { RecordDetailDialogComponent } from '../dialogs/record-detail-dialog/record-detail-dialog.component';
import { User } from '../../objects/user';

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

  patrollers: User[];

  constructor(private recordsService: RecordsService, private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getPatrollers();
  }

  getPatrollers(): void {
    this.userService.getPatrollersOrdered().subscribe(patrollers => this.patrollers = patrollers);
  }

  onPeakRadioButtonChange() {
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

  onTypeRadioButtonChange() {
    if (this.record.type === "Taxi" || this.record.type === "Non-event" || this.record.type === "Refusal") {
      this.record.typeLabel = this.record.type;
    } else {
      this.record.typeLabel = null;
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
    this.onPeakRadioButtonChange();
  }

  onMoreInfoButtonClicked() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordDetailDialogComponent, {
      data: {record: this.record}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Could submit here. Not sure though because other data may not
        //   be ready to be submitted.

        // Set to true if they exited with submit from dialog.
        this.record.hasSecondaryInfo = true;
      }
    });
  }
}
