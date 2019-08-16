import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordsService } from '../../services/records.service';
import { PatrollerService } from '../../services/patroller.service';
import { Record } from '../../objects/record';
import { Patroller } from '../../objects/patroller';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-kmc',
  templateUrl: './kmc.component.html',
  styleUrls: ['./kmc.component.css']
})
export class KmcComponent implements OnInit, OnDestroy {

  records: Record[] = [];
  patrollers: Patroller[];
  subscription = new Subscription();
  date: moment.Moment = moment();

  constructor(private recordsService: RecordsService, private patrollersService: PatrollerService) { }

  ngOnInit() {
    this.getRecords();
    this.getPatrollers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRecords() {
    let start = this.date.toDate();
    this.subscription.add(
      this.recordsService.get1050sForDay(start).subscribe(records => {
        this.records = records;
      })
    )
  }

  getPatrollers() {
    this.patrollersService.getAllPatrollers().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });
  }

  onDateChanged() {
    this.getRecords();
  }
}
