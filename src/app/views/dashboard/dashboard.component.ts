import { Component, OnInit } from '@angular/core';

import { Record } from '../../objects/record'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentRecord = new Record();

  constructor() { }

  ngOnInit() {
  }

  onRecordClicked(record: Record) {
    this.currentRecord = record;
  }
}
