import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../record-detail/record-detail.component';
import { Record } from '../../../objects/record';

@Component({
  selector: 'app-record-edit-time-dialog',
  templateUrl: './record-edit-time-dialog.component.html',
  styleUrls: ['./record-edit-time-dialog.component.css']
})
export class RecordEditTimeDialogComponent implements OnInit {

  record: Record;

  constructor(public dialogRef: MatDialogRef<RecordEditTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.record = data.record;
    }

  ngOnInit() {
  }

  onUpdateButtonClicked() {
    
  }

}
