import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pick-frontside-sweep',
  templateUrl: './pick-frontside-sweep.component.html',
  styleUrls: ['./pick-frontside-sweep.component.css']
})
export class PickFrontsideSweepComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PickFrontsideSweepComponent>) { }

  ngOnInit() {
  }

}
