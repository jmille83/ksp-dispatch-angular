import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  queries = [
    {id: 0, name: "ten50sPerPatroller"}
  ]

  startDate: moment.Moment = moment();
  endDate: moment.Moment = moment();

  constructor() { }

  ngOnInit() {
  }

}
