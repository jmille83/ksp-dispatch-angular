import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../../services/records.service';
import { Subscription } from 'rxjs';
import { Record } from '../../objects/record';
import { TenThirtythree } from '../../objects/ten-thirtythree';
import { User } from '../../objects/user';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ten-thirtythree-detail',
  templateUrl: './ten-thirtythree-detail.component.html',
  styleUrls: ['./ten-thirtythree-detail.component.css']
})
export class TenThirtythreeDetailComponent implements OnInit, OnDestroy {

  recordId: string;
  subscription = new Subscription();
  record = new Record();
  ten33 = new TenThirtythree();

  patrollers: User[];

  constructor(private route: ActivatedRoute, private recordsService: RecordsService, 
    private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Get any info we already have from record.
    this.route.params.forEach(() => {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.recordsService.getRecordForId(this.recordId).subscribe(records => {
        this.record = records[0];

        // Check for exisitng 10-33 object.
        this.recordsService.get1033ForId(this.record.id).subscribe(matches => {
          if (matches.length > 0) {
            this.ten33 = matches[0];
            console.log("matched old 1033")
          } else {
            this.ten33.id = this.record.id;
            this.onNew1033();
            console.log("new 1033")
          }
        });
        
      }));
    });
    
    this.userService.getPatrollers().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNew1033() {
    
    // Assign dispatcher right away.
    this.userService.getCurrentDispatcher().pipe(take(1)).subscribe(dispatcher => {
      this.ten33.dispatcherId = dispatcher.patrollerId;
      if (this.ten33.dispatcherId) {
        this.ten33.dispatcherAssigned = true;
        this.ten33.dispatcherAssignedTimeString = new Date().toLocaleTimeString();
      }
    });
  }

  /** CALLBACKS */
  onDispatcherAssigned() {
    if (this.ten33.dispatcherAssigned) {
      this.ten33.dispatcherAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.dispatcherAssignedTimeString = null;
    }
  }

  on3101Assigned() {
    if (this.ten33.three101Assigned) {
      this.ten33.three101AssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.three101AssignedTimeString = null;
    }
  }

  onClosedChannel1() {
    if (this.ten33.closedChannel1) {
      this.ten33.closedChannel1TimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.closedChannel1TimeString = null;
    }
  }

  onReopenedChannel1() {
    if (this.ten33.reopenedChannel1) {
      this.ten33.reopenedChannel1TimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.reopenedChannel1TimeString = null;
    }
  }

  onDirectorNotified() {
    if (this.ten33.directorNotified) {
      this.ten33.directorNotifiedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.directorNotifiedTimeString = null;
    }
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 10000});
  }
}
