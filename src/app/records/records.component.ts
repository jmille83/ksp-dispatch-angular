import { Component, OnInit } from '@angular/core';

import { Record, Gear } from '../record'
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  records: Record[];

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.getRecords();
  }

  getRecords(): void {
    this.recordsService.getRecords().subscribe(records => this.records = records);
  }
}
