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

  constructor(private liftEvacService: LiftEvacService) { }

  ngOnInit() {
    this.liftEvacService.getAllLifts().pipe(take(1)).subscribe(lifts => {
      this.lifts = lifts;
    });
  }

}
