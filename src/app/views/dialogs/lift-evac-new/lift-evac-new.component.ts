import { Component, OnInit } from '@angular/core';
import { Lift } from '../../../objects/lift';
import { LiftEvacService } from '../../../services/lift-evac.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lift-evac-new',
  templateUrl: './lift-evac-new.component.html',
  styleUrls: ['./lift-evac-new.component.css']
})
export class LiftEvacNewComponent implements OnInit {

  lift: string;
  lifts: Lift[];
  liftDownTime: number; 
  liftDownTimeString: string;
  returnObject: any;

  constructor(private liftEvacService: LiftEvacService) { }

  ngOnInit() {
    this.liftEvacService.getAllLifts().pipe(take(1)).subscribe(lifts => {
      this.lifts = lifts;
    });

    this.liftDownTime = new Date().getTime();
    this.liftDownTimeString = new Date().toLocaleTimeString();
  }

  onIncrement() {
    // Add a minute.
    this.liftDownTime += 60*1000;
    this.liftDownTimeString = new Date(this.liftDownTime).toLocaleTimeString();
    this.returnObject = {'lift': this.lift, 'stopTime': this.liftDownTime, 'stopTimeString': this.liftDownTimeString};
  }

  onDecrement() {
    // Subtract a minute.
    this.liftDownTime -= 60*1000;
    this.liftDownTimeString = new Date(this.liftDownTime).toLocaleTimeString();
    this.returnObject = {'lift': this.lift, 'stopTime': this.liftDownTime, 'stopTimeString': this.liftDownTimeString};
  }

  onNewSelection() {
    this.returnObject = {'lift': this.lift, 'stopTime': this.liftDownTime, 'stopTimeString': this.liftDownTimeString};
  }
}
