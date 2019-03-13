import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';
import { Opening } from '../../objects/opening'
import { OpeningsService } from '../../services/openings.service'
import { OpeningRecord } from '../../objects/opening-record';
import { CombinationOpening } from '../../objects/combination-opening'

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit {

  peak: string = "";
  peakName: string = "";
  openings: Opening[];
  patrollers: Patroller[];
  openingRecords: OpeningRecord[];
  combinationOpenings: CombinationOpening[] = [];

  openingsLoaded: boolean = false;
  openingRecordsLoaded: boolean = false;

  // Date starts as today by default.
  date: moment.Moment = moment();

  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
              private openingsService: OpeningsService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.peak = this.route.snapshot.paramMap.get('peak');
      this.setPeakNameForPeak();

      // Reset date.
      this.date = moment();

      this.onNewOpeningSelected();
    });

    this.getPatrollers();
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
    
    this.openingsService.getOpeningsListForPeak(this.peak).subscribe(openings => {
      this.openings = openings
      this.openingsLoaded = true;
      this.createCombinationRecords();
    });
    this.openingsService.getOpeningRecordsForPeakAndDate(this.peak, this.date.format('YYYY-MM-DD'))
    .subscribe(openingRecords => {
      this.openingRecords = openingRecords;
      this.openingRecordsLoaded = true;
      this.createCombinationRecords();
    });
  }

  createCombinationRecords() {
    if (this.openingsLoaded && this.openingRecordsLoaded) {
      this.combinationOpenings = [];

      this.openings.forEach(opening => {
        let combo = new CombinationOpening();
        combo.id = opening.id;
        combo.text = opening.text;
  
        let openingRecord: OpeningRecord = this.openingRecords.find(record => record.id == combo.id);
        if (openingRecord) {
          combo.patrollerId = openingRecord.patrollerId;
        }
  
        this.combinationOpenings.push(combo);
      });
    }
  }

  onSubmitButtonClicked() {
    // Take new data from combination records and put back into opening records.
    this.combinationOpenings.forEach(combo => {
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
}
