import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../../services/records.service';
import { Subscription, timer } from 'rxjs';
import { Record } from '../../objects/record';
import { TenThirtythree } from '../../objects/ten-thirtythree';
import { User } from '../../objects/user';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { DirectoryService } from '../../services/directory.service';
import { Constant } from '../../objects/constant';

@Component({
  selector: 'app-ten-thirtythree-detail',
  templateUrl: './ten-thirtythree-detail.component.html',
  styleUrls: ['./ten-thirtythree-detail.component.css']
})
export class TenThirtythreeDetailComponent implements OnInit, OnDestroy {

  recordId: string;
  subscription = new Subscription();
  record = new Record();
  timeString = "";
  dateString = "";
  ten33 = new TenThirtythree();
  patrollers: User[];
  constants: Constant[];
  constantsMap = {'director': new Constant(), 'ad': new Constant(), 'coo': new Constant(), 
                  'mtn-mgr': new Constant(), 'dir-h-and-s': new Constant(), 'ad-h-and-s': new Constant()};

  // Start after 10 seconds, save every 30 seconds.
  SECONDS = 1000;
  timer = timer(10*this.SECONDS, 30*this.SECONDS);
  
  constructor(private route: ActivatedRoute, private recordsService: RecordsService, 
    private userService: UserService, private snackBar: MatSnackBar, private directoryService: DirectoryService) { }

  ngOnInit() {
    // Get any info we already have from record.
    this.route.params.forEach(() => {
      this.recordId = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.recordsService.getRecordForId(this.recordId).subscribe(records => {
        this.record = records[0];
        this.dateString = new Date(this.record.time1033Called).toLocaleDateString();
        this.timeString = new Date(this.record.time1033Called).toLocaleTimeString();

        // Check for exisitng 10-33 object.
        this.recordsService.get1033ForId(this.record.id).subscribe(matches => {
          if (matches.length > 0) {
            this.ten33 = matches[0];
          } else {
            // Give the new 10-33 object the same id as the 10-50 it came from.
            this.ten33.id = this.record.id;
            this.ten33.name = this.record.name;
            this.ten33.location = this.record.location;
            this.ten33.sex = this.record.sex;
            this.ten33.chiefComplaint = this.record.chiefComplaint;
            this.onNew1033();
          }
        });     
      }));
    });
    
    this.userService.getPatrollersOrdered().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });

    this.directoryService.getConstants().pipe(take(1)).subscribe(constants => {
      this.constants = constants;
      this.constantsMap["director"] = this.constants.find(el => el.id === "director");
      this.constantsMap["ad"] = this.constants.find(el => el.id === "ad");
      this.constantsMap["coo"] = this.constants.find(el => el.id === "coo");
      this.constantsMap["mtn-mgr"] = this.constants.find(el => el.id === "mtn-mgr");
      this.constantsMap["dir-h-and-s"] = this.constants.find(el => el.id === "dir-h-and-s");
      this.constantsMap["ad-h-and-s"] = this.constants.find(el => el.id === "ad-h-and-s");
    });

    // Auto-save.
    this.subscription.add(this.timer.subscribe(() => {
      if (this.ten33.isActive) {
        this.recordsService.addOrUpdate1033(this.ten33);
        this.showDataSavedSnackbar();
      }
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNew1033() {    
    // Assign dispatcher right away.
    this.userService.getCurrentDispatcher().pipe(take(1)).subscribe(dispatcher => {
      if (dispatcher) {
        this.ten33.dispatcherId = dispatcher.patrollerId;
        this.ten33.dispatcherAssigned = true;
        this.ten33.dispatcherAssignedTimeString = new Date().toLocaleTimeString();
        
        // Store it.
        this.recordsService.addOrUpdate1033(this.ten33);
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

      // Stop updating.
      this.timer = null;
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

  onMountainSafetyNotified() {
    if (this.ten33.mountainSafetyNotified) {
      this.ten33.mountainSafetyNotifiedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.mountainSafetyNotifiedTimeString = null;
    }
  }

  onKmcNotified() {
    if (this.ten33.kmcNotified) {
      this.ten33.kmcNotifiedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.kmcNotifiedTimeString = null;
    }
  }

  onFamilyPatrollerAssigned() {
    if (this.ten33.familyPatrollerAssigned) {
      this.ten33.familyPatrollerAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.familyPatrollerAssignedTimeString = null;
    }
  }

  onInvestigatorAssigned() {
    if (this.ten33.investigatorAssigned) {
      this.ten33.investigatorAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.investigatorAssignedTimeString = null;
    }
  }

  onWitnessPatrollerAssigned() {
    if (this.ten33.witnessPatrollerAssigned) {
      this.ten33.witnessPatrollerAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.witnessPatrollerAssignedTimeString = null;
    }
  }

  onCleanupPatrollerAssigned() {
    if (this.ten33.cleanupPatrollerAssigned) {
      this.ten33.cleanupPatrollerAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.cleanupPatrollerAssignedTimeString = null;
    }
  }

  onSheriffNotified() {
    if (this.ten33.sheriffNotified) {
      this.ten33.sheriffNotifiedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.sheriffNotifiedTimeString = null;
    }
  }

  onForestServiceNotified() {
    if (this.ten33.forestServiceNotified) {
      this.ten33.forestServiceNotifiedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.forestServiceNotifiedTimeString = null;
    }
  }

  onIcAssigned() {
    if (this.ten33.icAssigned) {
      this.ten33.icAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.icAssignedTimeString = null;
    }
  }

  onMcAssigned() {
    if (this.ten33.mcAssigned) {
      this.ten33.mcAssignedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.mcAssignedTimeString = null;
    }
  }

  onIcTerminated() {
    if (this.ten33.icTerminated) {
      this.ten33.icTerminatedTimeString = new Date().toLocaleTimeString();
    } else {
      this.ten33.icTerminatedTimeString = null;
    }
  }

  onPatrollerDispatched() {
    this.ten33.patrollersDispatched.push({id: null, timeString: new Date().toLocaleTimeString(), equipment: null});
  }

  onNewPatientInfo() {
    this.ten33.patientInfoTable.push({time: new Date().toLocaleTimeString(), loc: null, ssx: null, vitals: null, tx: null});
  }

  onPatientCareTurnedOver() {
    if (this.ten33.patientCareTurnedOver) {
      this.ten33.patientCareTurnedOverTime = new Date().toLocaleTimeString();
    } else {
      this.ten33.patientCareTurnedOverTime = null;
    }
  }

  onLiftMaintenanceNotified() {
    if (this.ten33.liftMaintenanceNotified) {
      this.ten33.liftMaintenanceNotifiedTime = new Date().toLocaleTimeString();
    } else {
      this.ten33.liftMaintenanceNotifiedTime = null;
    }
  }

  onNotifiedKmcDoctorOfFlights() {
    if (this.ten33.kmcDoctorNotifiedOfFlightsLanding) {
      this.ten33.kmcDoctorNotifiedOfFlightsLandingTime = new Date().toLocaleTimeString();
    } else {
      this.ten33.kmcDoctorNotifiedOfFlightsLandingTime = null;
    }
  }

  onAmboStatusChanged() {
    this.ten33.ambulanceTime = new Date().toLocaleTimeString();
  }

  onKesDispatched() {
    if (this.ten33.kesDispatched) {
      this.ten33.kesDispatchedTime = new Date().toLocaleTimeString();
    } else {
      this.ten33.kesDispatchedTime = null;
    }
  }

  onMountainOpsNotifiedOfGulchRdTtravel() {
    if (this.ten33.mountainOpsNotifiedOfGulchRdTravel) {
      this.ten33.mountainOpsNotifiedOfGulchRdTravelTime = new Date().toLocaleTimeString();
    } else {
      this.ten33.mountainOpsNotifiedOfGulchRdTravelTime = null;
    }
  }

  ///////////////////
  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 10000});
  }

  showDataSavedSnackbar() {
    // This snackbar dismisses the keyboard on the tablet, so getting rid of it for now.
    //this.snackBar.open("Information saved", 'Dismiss', {duration: 2000});
  }

  onStateChanged() {
    // When made inactive, do a final save.
    if (!this.ten33.isActive) {
      this.recordsService.addOrUpdate1033(this.ten33);
    }
  }
}
