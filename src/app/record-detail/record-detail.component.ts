import { Component, OnInit, Input } from '@angular/core';

import { Record } from '../record';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {

  record: Record;

  constructor() { }

  ngOnInit() {
  }

}
