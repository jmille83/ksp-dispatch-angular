import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { LiftEvac } from '../../objects/lift-evac';
import { ActivatedRoute } from '@angular/router';
import { LiftEvacService } from '../../services/lift-evac.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../objects/user';

@Component({
  selector: 'app-lift-evac-detail',
  templateUrl: './lift-evac-detail.component.html',
  styleUrls: ['./lift-evac-detail.component.css']
})
export class LiftEvacDetailComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  evac = new LiftEvac();
  patrollers: User[];
  timeString = "";

  // Start after 10 seconds, save every 30 seconds.
  SECONDS = 1000;
  timer = timer(10*this.SECONDS, 30*this.SECONDS);
  
  constructor(private route: ActivatedRoute, private liftEvacService: LiftEvacService, 
    private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.forEach(() => {
      let evacId = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.liftEvacService.getLiftEvacWithId(evacId).subscribe(evacs => {
        this.evac = evacs[0];
        this.timeString = new Date(this.evac.startTime).toLocaleTimeString();
      }));
    });
    
    this.userService.getPatrollers().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });


    // Auto-save.
    this.subscription.add(this.timer.subscribe(() => {
      if (this.evac.isActive) {
        this.liftEvacService.updateLiftEvac(this.evac);
        this.showDataSavedSnackbar();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDataSavedSnackbar() {
    this.snackBar.open("Information saved", 'Dismiss', {duration: 2000});
  }

}
