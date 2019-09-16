import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiftEvac } from '../../objects/lift-evac';
import { LiftEvacService } from '../../services/lift-evac.service';

@Component({
  selector: 'app-lift-evac-home',
  templateUrl: './lift-evac-home.component.html',
  styleUrls: ['./lift-evac-home.component.css']
})
export class LiftEvacHomeComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  evacs: LiftEvac[];

  constructor(private liftEvacService: LiftEvacService) { }

  ngOnInit() {
    this.subscription.add(this.liftEvacService.getAllLiftEvacs().subscribe(evacs => {
      this.evacs = evacs;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
