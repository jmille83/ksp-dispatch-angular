import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';
import { Opening } from '../../objects/opening'
import { OpeningsService } from '../../services/openings.service'
import { OpeningRecord } from '../../objects/opening-record';
import { CombinationOpening } from '../../objects/combination-opening'
import { AuthService } from '../../services/auth.service';
import { User } from '../../objects/user';
import { Observable } from 'rxjs/Observable'
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit, OnDestroy {

  peak: string = "";
  peakName: string = "";
  patrollers: Patroller[];
  
  openings: Opening[];
  openingRecords: OpeningRecord[];
  personnelOpenings: Opening[];
  
  hasUnsubmittedChanges: boolean = false;
  
  // Date starts as today by default.
  date: moment.Moment = moment();

  user: User;

  // For storing all subs so we can unsub on destroy.
  private subscription = new Subscription();
  
  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
              private openingsService: OpeningsService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach(() => {
      this.peak = this.route.snapshot.paramMap.get('peak');
      this.setPeakNameForPeak();
      this.onNewOpeningSelected();
    });

    this.getPatrollers();

    this.subscription.add(
      this.authService.user$.subscribe((user) => {
        this.user = user;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setPeakNameForPeak() {
    if (this.peak === "frontside") {
      this.peakName = "Frontside";
    } else if (this.peak === "north-peak") {
      this.peakName = "North Peak";
    } else if (this.peak === "outback") {
      this.peakName = "Outback";
    }
  }

  onNewOpeningSelected() {
    this.hasUnsubmittedChanges = false;
    
    // Get openings once to create opening records.
    this.openingsService.getOpeningsListForPeak(this.peak)
    .pipe(take(1))
    .subscribe(openings => {
      this.openings = openings;
    });

    // Get personnel openings once.
    this.openingsService.getPersonnelOpeningsListForPeak(this.peak)
    .pipe(take(1))
    .subscribe(personnel => {
      this.personnelOpenings = personnel;
    });

    // Get initial state of opening records once, either from previous data, or to create.
    this.openingsService.getInitialOpeningRecordsForPeakAndDate(this.peak, this.date.format('YYYY-MM-DD'))
    .pipe(take(1))
    .subscribe(openingRecords => {
      this.openingRecords = openingRecords;
      if (openingRecords.length === 0) {
        this.createRecords();
      }
    });

    // Open subscription to changes in the 'opening records'.
    this.subscription.add(
    this.openingsService.getOpeningRecordChangesForPeakAndDate(this.peak, this.date.format('YYYY-MM-DD'))
    .subscribe(actions => {
      actions.forEach(action => {      
        let update = action.payload.doc.data() as OpeningRecord;
        let rec = this.openingRecords.find(rec => rec.id == update.id);
        console.log(update.id + " " + action.type);
        if (update.patrollerId === rec.patrollerId && update.notes === rec.notes) {
        } else {
          rec.patrollerId = update.patrollerId;
          rec.notes = update.notes;
        }  
      });
    }));
  }

  // Adds id, text, and order to a brand new 'opening record' from its 'opening' parent.
  // Plus, whether it's personnel or not. 
  // Now it's ready for specific data.
  createRecords() {
    this.openings.forEach(opening => {
      var rec = new OpeningRecord();
      rec.id = opening.id;
      rec.text = opening.text;
      rec.order = opening.order;
      rec.personnel = false;
      this.openingRecords.push(rec);
    });
    this.personnelOpenings.forEach(pOpening => {
      var rec = new OpeningRecord();
      rec.id = pOpening.id;
      rec.text = pOpening.text;
      rec.order = pOpening.order;
      rec.personnel = true;
      this.openingRecords.push(rec)
    });
    this.onSubmitButtonClicked();
  }

  onSubmitButtonClicked() {
    this.openingsService.submitOpeningRecords(this.openingRecords, this.peak, this.date.format('YYYY-MM-DD'));
    this.hasUnsubmittedChanges = false;
  }

  onClearButtonClicked() {
    this.onNewOpeningSelected();
  }

  onDateChanged() {
    this.onNewOpeningSelected();
  }

  getPatrollers(): void {
    this.subscription.add(
      this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers)
    );
  }

  onOpeningValueChanged() {
    this.hasUnsubmittedChanges = true;
  }

  canEdit(): boolean {
    if (this.peak === "north-peak" && this.authService.canNorthPeak(this.user)) {
      return true;
    } else if (this.peak === "outback" && this.authService.canOutback(this.user)) {
      return true;
    } else if (this.peak === "frontside" && this.authService.isDispatch(this.user)) {
      return true;
    } else {
      return false;
    }  
  }
}
