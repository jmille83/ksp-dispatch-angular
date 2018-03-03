import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Patroller } from '../patroller'
import { PatrollerService } from '../patroller.service';
import { Opening } from '../opening'
import { OpeningsService } from '../openings.service'

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

  constructor(private route: ActivatedRoute, private patrollerService: PatrollerService,
              private openingsService: OpeningsService) { }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.peak = this.route.snapshot.paramMap.get('peak');
      this.setPeakNameForPeak();
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
    this.openingsService.getOpeningsForPeak(this.peak).subscribe(openings => this.openings = openings);
  }

  getPatrollers(): void {
    this.patrollerService.getAllPatrollers().subscribe(patrollers => this.patrollers = patrollers);
  }
}
