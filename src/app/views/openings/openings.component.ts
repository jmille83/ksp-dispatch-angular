import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Patroller } from '../../objects/patroller'
import { PatrollerService } from '../../services/patroller.service';
import { Opening } from '../../objects/opening'
import { OpeningsService } from '../../services/openings.service'
import { OpeningRecord } from '../../objects/opening-record';
import { AuthService } from '../../services/auth.service';
import { User } from '../../objects/user';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatRadioChange, MatDialog } from '@angular/material';
import { OpeningEditComponent } from '../dialogs/opening-edit/opening-edit.component';
import { PickFrontsideSweepComponent } from '../dialogs/pick-frontside-sweep/pick-frontside-sweep.component';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit, OnDestroy {

  isOpening: boolean = true;
  openingOrClosing: string = "";
  openingOrClosingName: string = "";
  openingOrClosingHeaderName: string = "";
  peak: string = "";
  peakName: string = "";
  patrollers: Patroller[];
  
  openings: Opening[];
  openingRecords: OpeningRecord[];
  personnelOpenings: Opening[];
  
  hasUnsubmittedChanges: boolean = false;
  date: moment.Moment = moment(); // Today.
  typeOfFrontsideSweeps = "Day";
  canEditStored: boolean = false;
  canEditHasBeenChecked: boolean = false;

  editMode: boolean = false;

  // For storing all subs so we can unsub on destroy.
  private subscription = new Subscription();
  
  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
              private openingsService: OpeningsService, private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.forEach(() => {
      this.openingOrClosing = this.route.snapshot.paramMap.get('type');
      this.peak = this.route.snapshot.paramMap.get('peak');     
      
      // This has to be done within the foreach so it is called when a new opening is selected.
      if (this.openingOrClosing === "closings" && this.peak === "frontside") {
        // Set a default.
        this.typeOfFrontsideSweeps = this.getTypeOfFrontsideSweeps();
        
        // Make them actively choose.
        setTimeout(() => {this.showPickFrontsideSweepsDialog()}, 5000);
      }
  
      this.doSetup();
    });
    this.getPatrollers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doSetup() {
    this.setPeakNameForPeak();
    this.setOpeningOrClosingName();
    this.onNewOpeningSelected();   
  }

  setOpeningOrClosingName() {
    if (this.openingOrClosing === "openings") {
      this.openingOrClosingName = "Openings";
      this.openingOrClosingHeaderName = "Opening";
    } else {
      this.openingOrClosingName = "Sweeps";
      this.openingOrClosingHeaderName = "Sweep";
    }
  }

  onNewOpeningSelected() {
    this.hasUnsubmittedChanges = false;
    
    // Get openings once to create opening records.
    this.openingsService.getListForTypeAndPeak(this.openingOrClosing, this.peak)
    .pipe(take(1))
    .subscribe(openings => {
      this.openings = openings;
    });

    // Get personnel openings once for openings.
    if (this.isOpening) {
      this.openingsService.getPersonnelOpeningsListForPeak(this.peak)
      .pipe(take(1))
      .subscribe(personnel => {
        this.personnelOpenings = personnel;
      });
    }

    // Get initial state of opening records once, either from previous data, or to create.
    this.openingsService.getInitialRecordsForTypeAndPeakAndDate(this.openingOrClosing, this.peak, this.date.format('YYYY-MM-DD'))
    .pipe(take(1))
    .subscribe(openingRecords => {
      this.openingRecords = openingRecords;
      if (openingRecords.length === 0) {
        this.createRecords();
      }
    });

    // Open subscription to changes in the 'opening records'.
    this.subscription.add(
    this.openingsService.getChangesForTypeAndPeakAndDate(this.openingOrClosing, this.peak, this.date.format('YYYY-MM-DD'))
    .subscribe(actions => {
      actions.forEach(action => {      
        let update = action.payload.doc.data() as OpeningRecord;
        let rec = this.openingRecords.find(rec => rec.id == update.id);
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
      rec.header = opening.header ? true : false;
      rec.day = opening.day ? true : false;
      rec.night = opening.night ? true : false;
      this.openingRecords.push(rec);
    });
    if (this.isOpening) {
      this.personnelOpenings.forEach(pOpening => {
        var rec = new OpeningRecord();
        rec.id = pOpening.id;
        rec.text = pOpening.text;
        rec.order = pOpening.order;
        rec.personnel = true;
        this.openingRecords.push(rec)
      });
    }
    this.onSubmitButtonClicked();
  }

  onSubmitButtonClicked() {
    this.openingsService.submitRecordsForTypeAndPeakAndDate(this.openingRecords, this.openingOrClosing, this.peak, this.date.format('YYYY-MM-DD'));
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
    if (!this.canEditHasBeenChecked) {
      let val = false;
      if (this.peak === "north-peak" && this.authService.canNorthPeak(this.authService.getCurrentUser())) {
        val = true;
      } else if (this.peak === "outback" && this.authService.canOutback(this.authService.getCurrentUser())) {
        val = true;
      } else if (this.peak === "frontside" || "frontside-day" || "frontside-night" && this.authService.isDispatch(this.authService.getCurrentUser())) {
        val = true;
      } else {
        val = false;
      }
      this.canEditStored = val;
    }
    return this.canEditStored;
  }

  getTypeOfFrontsideSweeps(): string {
    let dayOfWeek = this.date.day();
    if (dayOfWeek === 1 || dayOfWeek === 2) {
      return "Day";
    } else {
      return "Night";
    }
  }

  showPickFrontsideSweepsDialog() {
    let dialogRef = this.dialog.open(PickFrontsideSweepComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== this.typeOfFrontsideSweeps) {
        // Reset peak to just frontside so it can go through its checks again.
        this.peak = "frontside";

        this.typeOfFrontsideSweeps = result;
        this.doSetup();
      }
    });
  }

  onRadioChange(event: MatRadioChange) {
    if (event.value === "Day") {
      this.peak = "frontside-day";
      this.peakName = "Frontside Day";
    } else {
      this.peak = "frontside-night";
      this.peakName = "Frontside Night";
    }
  
    this.onNewOpeningSelected();
  }
  
  isClosingAndFrontside(): boolean {
    return this.peak === "frontside-day" || this.peak === "frontside-night";
  }

  setPeakNameForPeak() {
    if (this.openingOrClosing === "openings") {
      if (this.peak === "frontside") {
        this.peakName = "Frontside";
      } else if (this.peak === "north-peak") {
        this.peakName = "North Peak";
      } else if (this.peak === "outback") {
        this.peakName = "Outback";
      }
      this.isOpening = true;
    } else {
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
      this.isOpening = false;
    }
  }

  isDispatch() {
    return this.authService.isDispatch(this.authService.getCurrentUser());
  }

  onEditButtonClicked(opening: Opening) {
    this.dialog.open(OpeningEditComponent, {
      data: { opening: opening,
              type: this.openingOrClosing }
    });
  }
}

export interface DialogData {
  opening: Opening;
  type: string; 
}
