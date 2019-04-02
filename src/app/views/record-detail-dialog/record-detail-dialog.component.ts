import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../record-detail/record-detail.component';

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
    {value: 'Flights / Helicopter'},
    {value: 'Flights / Ambulance'}
  ];

  constructor(public dialogRef: MatDialogRef<RecordDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {}
}
