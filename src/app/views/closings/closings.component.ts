import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MatRadioChange } from '@angular/material';

import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../objects/user';
import { Subscription } from 'rxjs';
import { ClosingsService } from '../../services/closings.service';
import { Closing } from '../../objects/closing';
import { ClosingRecord } from '../../objects/closing-record';
import { CombinationClosing } from '../../objects/combination-closing';


@Component({
  selector: 'app-closings',
  templateUrl: './closings.component.html',
  styleUrls: ['./closings.component.css']
})
export class ClosingsComponent implements OnInit {

  peak: string = "";
  peakName: string = "";
  typeOfFrontsideSweeps = "Day";
  patrollers: Patroller[];

  closings: Closing[];
  closingRecords: ClosingRecord[];
  combinationClosings: CombinationClosing[] = [];
  closingsLoaded: boolean = false;
  closingRecordsLoaded: boolean = false;

  // Date starts as today by default.
  date: moment.Moment = moment();

  user: User;
  subscription: Subscription = null;

  hasUnsubmittedChanges: boolean = false;

  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
    private closingsService: ClosingsService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.peak = this.route.snapshot.paramMap.get('peak');
      this.typeOfFrontsideSweeps = this.getTypeOfFrontsideSweeps();
      this.setPeakNameForPeak();

      // Reset date.
      this.date = moment();

      this.onNewClosingSelected();
    });

    this.getPatrollers();

    this.subscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTypeOfFrontsideSweeps(): string {
    let dayOfWeek = this.date.day();
    if (dayOfWeek === 1 || dayOfWeek === 2) {
      return "Day";
    } else {
      return "Night";
    }
  }
  
  setPeakNameForPeak() {
    if (this.peak === "frontside") {
      if (this.typeOfFrontsideSweeps === "Day") {
        this.peak = "frontside-day";
      } else {
        this.peak = "frontside-night";
      }
    }
    if (this.peak === "frontside-day") {
      this.peakName = "Frontside Day";
    } else if (this.peak === "frontside-night") {
      this.peakName = "Frontside Night";
    } else if (this.peak === "north-peak") {
      this.peakName = "North Peak";
    } else if (this.peak === "outback") {
      this.peakName = "Outback";
    }
  }

  onNewClosingSelected() {
    this.closingsLoaded = false;
    this.closingRecordsLoaded = false;
    this.hasUnsubmittedChanges = false;
    
    if (this.peak === "frontside-day") {
      this.closingsService.getFrontsideClosingsListForType("day").subscribe(closings => {
        this.closings = closings;
        this.closingsLoaded = true;
        this.createCombinationRecords();
      });
    } else if (this.peak === "frontside-night") {
      this.closingsService.getFrontsideClosingsListForType("night").subscribe(closings => {
        this.closings = closings;
        this.closingsLoaded = true;
        this.createCombinationRecords();
      });
    } else {
      this.closingsService.getClosingsListForPeak(this.peak).subscribe(closings => {
        this.closings = closings;
        this.closingsLoaded = true;
        this.createCombinationRecords();
      });
    }
    
    this.closingsService.getClosingRecordsForPeakAndDate(this.peak, this.date.format('YYYY-MM-DD'))
    .subscribe(closingRecords => {
      this.closingRecords = closingRecords;
      this.closingRecordsLoaded = true;
      this.createCombinationRecords();
    });
  }

  createCombinationRecords() {
    if (this.closingsLoaded && this.closingRecordsLoaded) {
      this.combinationClosings = [];
      
      this.closings.forEach(closing => {
        let combo = new CombinationClosing();
        combo.id = closing.id;
        combo.text = closing.text;
        combo.header = closing.header;
  
        let closingRecord: ClosingRecord = this.closingRecords.find(record => record.id == combo.id);
        if (closingRecord) {
          combo.patrollerId = closingRecord.patrollerId;
          combo.notes = closingRecord.notes;
        }
  
        this.combinationClosings.push(combo);
      });
    }
  }

  onSubmitButtonClicked() {
    // Take new data from combination records and put back into opening records.
    this.combinationClosings.forEach(combo => {
      let closingRecord: ClosingRecord = this.closingRecords.find(record => record.id == combo.id);
      
      if (closingRecord) {
        closingRecord.patrollerId = combo.patrollerId;
        closingRecord.notes = combo.notes;
      } else {
        let newRecord = new ClosingRecord();
        newRecord.id = combo.id;
        newRecord.patrollerId = combo.patrollerId;
        newRecord.notes = combo.notes;
        this.closingRecords.push(newRecord);
      }
    });

    this.closingsService.submitClosingRecords(this.closingRecords, this.peak, this.date.format('YYYY-MM-DD'));
    this.hasUnsubmittedChanges = false;
  }

  onClearButtonClicked() {
    this.onNewClosingSelected();
  }

  onDateChanged() {
    this.onNewClosingSelected();
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }

  canEdit(): boolean {
    if (this.peak === "north-peak" && this.authService.canNorthPeak(this.user)) {
      return true;
    } else if (this.peak === "outback" && this.authService.canOutback(this.user)) {
      return true;
    } else if (this.peak === "frontside-day" || "frontside-night" && this.authService.isDispatch(this.user)) {
      return true;
    } else {
      return false;
    }
  }

  isFrontside(): boolean {
    return this.peak === "frontside-day" || this.peak === "frontside-night";
  }

  onRadioChange(event: MatRadioChange) {
    if (event.value === "Day") {
      this.peak = "frontside-day";
      this.peakName = "Frontside Day";
    } else {
      this.peak = "frontside-night";
      this.peakName = "Frontside Night";
    }

    this.onNewClosingSelected();
  }

  onValueChanged() {
    this.hasUnsubmittedChanges = true;
  }
}
