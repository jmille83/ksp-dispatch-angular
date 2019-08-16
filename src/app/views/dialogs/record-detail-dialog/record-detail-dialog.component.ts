import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../record-detail/record-detail.component';
import { Record } from '../../../objects/record';

@Component({
  selector: 'app-record-detail-dialog',
  templateUrl: './record-detail-dialog.component.html',
  styleUrls: ['./record-detail-dialog.component.css']
})
export class RecordDetailDialogComponent implements OnInit {

  rigTypes = [
    {value: 'Regular'},
    {value: 'Longboard'},
    {value: 'Scoop'},
    {value: 'Double'},
    {value: 'Crystal'}
  ];

  transportTypes = [
    {value: 'Ambulance'},
    {value: 'Flights (Helicopter)'},
    {value: 'Flights (Ambulance)'}
  ];

  time: Date = new Date();
  record: Record;

  constructor(public dialogRef: MatDialogRef<RecordDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.record = data.record;
  }

  ngOnInit() {}

  onNowButtonClicked() {
    this.time = new Date();
    this.record.transportTimeCalled = this.time.toLocaleTimeString();
    if (this.record.transportEta == null) {
      this.record.transportEta = this.time.toLocaleTimeString();
    }
  }

  onPlus5ButtonClicked() {
    this.time.setMinutes(this.time.getMinutes() + 5);
    this.record.transportEta = this.time.toLocaleTimeString();
  }
}
