import { Component, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit {

  peak: string = "";
  peakName: string = "";
  patrollers: Patroller[];
  
  openings: Opening[];
  openingRecords: OpeningRecord[];
  combinationOpenings: CombinationOpening[] = [];
  openingsLoaded: boolean = false;
  openingRecordsLoaded: boolean = false;

  personnelOpenings: Opening[];
  combinationPersonnelOpenings: CombinationOpening[] = [];
  personnelOpeningsLoaded: boolean = false;

  hasUnsubmittedChanges: boolean = false;
  comboRecordsCreated: boolean = false;
  
  // Date starts as today by default.
  date: moment.Moment = moment();

  user: User;
  canEditStored: boolean = false;
  
  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
              private openingsService: OpeningsService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.peak = this.route.snapshot.paramMap.get('peak');
      this.setPeakNameForPeak();
      this.onNewOpeningSelected();
    });

    this.getPatrollers();

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
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
    this.openingsLoaded = false;
    this.openingRecordsLoaded = false;
    this.personnelOpeningsLoaded = false;
    this.hasUnsubmittedChanges = false;
    
    this.openingsService.getOpeningsListForPeak(this.peak).subscribe(openings => {
      console.log('got update.')
      this.openings = openings;
      this.openingsLoaded = true;
      this.createCombinationRecords();
    });
    this.openingsService.getOpeningRecordsForPeakAndDate(this.peak, this.date.format('YYYY-MM-DD'))
    .subscribe(openingRecords => {
      console.log('got update.')
      this.openingRecords = openingRecords;
      this.openingRecordsLoaded = true;
      this.createCombinationRecords();
    });
    this.openingsService.getPersonnelOpeningsListForPeak(this.peak).subscribe(personnel => {
      console.log('got update.')
      this.personnelOpenings = personnel;
      this.personnelOpeningsLoaded = true;
      this.createCombinationRecords();
    });
  }

  createCombinationRecords() {
    if (this.openingsLoaded && this.openingRecordsLoaded && this.personnelOpeningsLoaded && !this.comboRecordsCreated) {
      this.combinationOpenings = [];
      this.combinationPersonnelOpenings = [];

      this.openings.forEach(opening => {
        let combo = new CombinationOpening();
        combo.id = opening.id;
        combo.text = opening.text;
  
        let openingRecord: OpeningRecord = this.openingRecords.find(record => record.id == combo.id);
        if (openingRecord) {
          combo.patrollerId = openingRecord.patrollerId;
          combo.notes = openingRecord.notes;
        }
  
        this.combinationOpenings.push(combo);
      });

      this.personnelOpenings.forEach(opening => {
        let combo = new CombinationOpening();
        combo.id = opening.id;
        combo.text = opening.text;
  
        let openingRecord: OpeningRecord = this.openingRecords.find(record => record.id == combo.id);
        if (openingRecord) {
          combo.patrollerId = openingRecord.patrollerId;
        }
  
        this.combinationPersonnelOpenings.push(combo);
      });

      this.comboRecordsCreated = true;
    }
  }

  onSubmitButtonClicked() {
    // Take new data from combination records and put back into opening records.
    this.combinationOpenings.forEach(combo => {
      let openingRecord: OpeningRecord = this.openingRecords.find(record => record.id == combo.id);
      
      if (openingRecord) {
        openingRecord.patrollerId = combo.patrollerId;
        openingRecord.notes = combo.notes;
      } else {
        let newRecord = new OpeningRecord();
        newRecord.id = combo.id;
        newRecord.patrollerId = combo.patrollerId;
        newRecord.notes = combo.notes;
        this.openingRecords.push(newRecord);
      }
    });

    this.combinationPersonnelOpenings.forEach(combo => {
      let openingRecord: OpeningRecord = this.openingRecords.find(record => record.id == combo.id);
      
      if (openingRecord) {
        openingRecord.patrollerId = combo.patrollerId;
      } else {
        let newRecord = new OpeningRecord();
        newRecord.id = combo.id;
        newRecord.patrollerId = combo.patrollerId;
        this.openingRecords.push(newRecord);
      }
    });

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
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }

  onOpeningValueChanged() {
    this.hasUnsubmittedChanges = true;
  }

  canEdit(): boolean {
    // If the check's been approved once, go with it.
    if (this.canEditStored) {
      return true;

    // If not, check.
    } else {
      if (this.peak === "north-peak" && this.authService.canNorthPeak(this.user)) {
        this.canEditStored = true;
      } else if (this.peak === "outback" && this.authService.canOutback(this.user)) {
        this.canEditStored = true;
      } else if (this.peak === "frontside" && this.authService.isDispatch(this.user)) {
        this.canEditStored = true;
      } else {
        return false;
      }
      return this.canEditStored;
    }
    
  }
}
