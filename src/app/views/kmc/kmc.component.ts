import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordsService } from '../../services/records.service';
import { Record } from '../../objects/record';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';
import { User } from '../../objects/user';

@Component({
  selector: 'app-kmc',
  templateUrl: './kmc.component.html',
  styleUrls: ['./kmc.component.css']
})
export class KmcComponent implements OnInit, OnDestroy {

  records: Record[] = [];
  patrollers: User[];
  subscription = new Subscription();
  date: moment.Moment = moment();

  constructor(private recordsService: RecordsService, private userService: UserService) { }

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
    this.userService.getPatrollers().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });
  }

  onDateChanged() {
    this.getRecords();
  }
}
