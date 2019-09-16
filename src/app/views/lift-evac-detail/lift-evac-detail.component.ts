import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { LiftEvac } from '../../objects/lift-evac';
import { ActivatedRoute } from '@angular/router';
import { LiftEvacService } from '../../services/lift-evac.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';
import { User } from '../../objects/user';
import { AuthService } from '../../services/auth.service';

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
  currentUser: User;

  // Start after 10 seconds, save every 30 seconds.
  SECONDS = 1000;
  timer = timer(10*this.SECONDS, 30*this.SECONDS);
  
  constructor(private route: ActivatedRoute, private liftEvacService: LiftEvacService, 
    private userService: UserService, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach(() => {
      let evacId = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.liftEvacService.getLiftEvacWithId(evacId).subscribe(evacs => {
        this.evac = evacs[0];
      }));
    });
    
    this.userService.getPatrollers().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });

    this.authService.user$.subscribe(() => {
      this.currentUser = this.authService.getCurrentUser()
    });

    // Auto-save.
    this.subscription.add(this.timer.subscribe(() => {
      if (this.evac.isActive) {
        this.liftEvacService.updateLiftEvac(this.evac);
        //this.showDataSavedSnackbar();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDataSavedSnackbar() {
    this.snackBar.open("Information saved", 'Dismiss', {duration: 2000});
  }

  onStateChanged() {
    // When made inactive, do a final save.
    if (!this.evac.isActive) {
      this.liftEvacService.updateLiftEvac(this.evac);
    }
  }

  onLiftRestart() {
    this.evac.restartTime = new Date().getTime();
    this.evac.restartTimeString = new Date().toLocaleTimeString();

    this.evac.downTime = this.evac.restartTime - this.evac.stopTime;
    let mins = Math.round(this.evac.downTime/1000/60);
    let hours = 0;
    let hasHours = false;
    while (mins > 60) {
      mins -= 60;
      hours += 1;
      hasHours = true;
    }
    if (hasHours) {
      this.evac.downTimeString = hours + " hours, " + mins + " minutes";
    } else {
      this.evac.downTimeString = mins + " minutes";
    }
  }

  //////////////// Callbacks //////////////////////////
  onIcAssigned() {
    if (this.evac.icAssigned) {
      this.evac.icAssignedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.icAssignedSig = null;
    }
  }

  onChannel1Announcement() {
    if (this.evac.channel1Announced) {
      this.evac.channel1AnnouncedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.channel1AnnouncedSig = null;
    }
  }
  
}
