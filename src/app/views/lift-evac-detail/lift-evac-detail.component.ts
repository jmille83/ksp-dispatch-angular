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
import { Constant } from '../../objects/constant';
import { DirectoryService } from '../../services/directory.service';

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

  constants: Constant[];
  constantsMap = {'director': new Constant(), 'ad': new Constant(), 'coo': new Constant(), 
                  'mtn-mgr': new Constant(), 'dir-h-and-s': new Constant(), 'ad-h-and-s': new Constant()};
  
  constructor(private route: ActivatedRoute, private liftEvacService: LiftEvacService, 
    private userService: UserService, private snackBar: MatSnackBar, private authService: AuthService,
    private directoryService: DirectoryService) { }

  ngOnInit() {
    this.route.params.forEach(() => {
      let evacId = this.route.snapshot.paramMap.get('id');
      this.subscription.add(this.liftEvacService.getLiftEvacWithId(evacId).subscribe(evacs => {
        this.evac = evacs[0];
      }));
    });
    
    this.userService.getPatrollersOrdered().pipe(take(1)).subscribe(patrollers => {
      this.patrollers = patrollers;
    });

    this.authService.user$.subscribe(() => {
      this.currentUser = this.authService.getCurrentUser()
    });

    this.directoryService.getConstants().pipe(take(1)).subscribe(constants => {
      this.constants = constants;
      this.constantsMap["director"] = this.constants.find(el => el.id === "director");
      this.constantsMap["ad"] = this.constants.find(el => el.id === "ad");
      this.constantsMap["coo"] = this.constants.find(el => el.id === "coo");
      this.constantsMap["mtn-mgr"] = this.constants.find(el => el.id === "mtn-mgr");
      this.constantsMap["dir-h-and-s"] = this.constants.find(el => el.id === "dir-h-and-s");
      this.constantsMap["ad-h-and-s"] = this.constants.find(el => el.id === "ad-h-and-s");
      this.constantsMap["lm-dir"] = this.constants.find(el => el.id === "lm-dir");
      this.constantsMap["lm-sr-mgr"] = this.constants.find(el => el.id === "lm-sr-mgr");
      this.constantsMap["evac1"] = this.constants.find(el => el.id === "evac1");
      this.constantsMap["evac2"] = this.constants.find(el => el.id === "evac2");
      this.constantsMap["evac3"] = this.constants.find(el => el.id === "evac3");
      this.constantsMap["evac4"] = this.constants.find(el => el.id === "evac4");
      this.constantsMap["summit-outpost"] = this.constants.find(el => el.id === "summit-outpost");
      this.constantsMap["kes"] = this.constants.find(el => el.id === "kes");
      this.constantsMap["guest-services"] = this.constants.find(el => el.id === "guest-services");
      this.constantsMap["ski-school"] = this.constants.find(el => el.id === "ski-school");
      this.constantsMap["adv-point"] = this.constants.find(el => el.id === "adv-point");
      this.constantsMap["grooming"] = this.constants.find(el => el.id === "grooming");
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

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 10000});
  }

  showDataSavedSnackbar() {
    //this.snackBar.open("Information saved", 'Dismiss', {duration: 2000});
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
  
  onDirectorNotified() {
    if (this.evac.directorNotified) {
      this.evac.directorNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.directorNotifiedSig = null;
    }
  }

  onSupNotified() {
    if (this.evac.supNotified) {
      this.evac.supNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.supNotifiedSig = null;
    }
  }

  onTeam1Notified() {
    if (this.evac.team1Notified) {
      this.evac.team1NotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.team1NotifiedSig = null;
    }
  }

  onTeam2Notified() {
    if (this.evac.team2Notified) {
      this.evac.team2NotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.team2NotifiedSig = null;
    }
  }

  onTeam3Notified() {
    if (this.evac.team3Notified) {
      this.evac.team3NotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.team3NotifiedSig = null;
    }
  }

  onTeam4Notified() {
    if (this.evac.team4Notified) {
      this.evac.team4NotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.team4NotifiedSig = null;
    }
  }

  onLmDirNotified() {
    if (this.evac.lmDirNotified) {
      this.evac.lmDirNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.lmDirNotifiedSig = null;
    }
  }
  
  onLmMgrNotified() {
    if (this.evac.lmMgrNotified) {
      this.evac.lmMgrNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.lmMgrNotifiedSig = null;
    }
  }

  onPaperworkStarted() {
    if (this.evac.paperworkStarted) {
      this.evac.paperworkStartedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.paperworkStartedSig = null;
    }
  }

  onLiaisonAssigned() {
    if (this.evac.liaisonAssigned) {
      this.evac.liaisonAssignedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.liaisonAssignedSig = null;
    }
  }

  onVerbalContactInitiated() {
    if (this.evac.verbalContactInitiated) {
      this.evac.verbalContactInitiatedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.verbalContactInitiatedSig = null;
    }
  }

  onSummitHouseCoordAssigned() {
    if (this.evac.summitHouseCoordAssigned) {
      this.evac.summitHouseCoordAssignedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.summitHouseCoordAssignedSig = null;
    }
  }

  onOutpostCoordAssigned() {
    if (this.evac.outpostCoordAssigned) {
      this.evac.outpostCoordAssignedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.outpostCoordAssignedSig = null;
    }
  }

  onFbManagersNotified() {
    if (this.evac.fbManagersNotified) {
      this.evac.fbManagersNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.fbManagersNotifiedSig = null;
    }
  }

  onGuestServicesNotified() {
    if (this.evac.guestServicesNotified) {
      this.evac.guestServicesNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.guestServicesNotifiedSig = null;
    }
  }

  onKesNotified() {
    if (this.evac.kesNotified) {
      this.evac.kesNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.kesNotifiedSig = null;
    }
  }

  onSkiSchoolNotified() {
    if (this.evac.skiSchoolNotified) {
      this.evac.skiSchoolNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.skiSchoolNotifiedSig = null;
    }
  }

  onAdventurePointNotified() {
    if (this.evac.adventurePointNotified) {
      this.evac.adventurePointNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.adventurePointNotifiedSig = null;
    }
  }

  onGroomingNotified() {
    if (this.evac.groomingNotified) {
      this.evac.groomingNotifiedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.groomingNotifiedSig = null;
    }
  }

  onEvacTeamAssembled() {
    if (this.evac.evacTeamAssembled) {
      this.evac.evacTeamAssembledSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.evacTeamAssembledSig = null;
    }
  }

  onGroundCrewsRequested() {
    if (this.evac.groundCrewsRequested) {
      this.evac.groundCrewsRequestedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.groundCrewsRequestedSig = null;
    }
  }

  onTeamsAssigned() {
    if (this.evac.teamsAssigned) {
      this.evac.teamsAssignedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.teamsAssignedSig = null;
    }
  }

  onAidCalled() {
    if (this.evac.aidCalled) {
      this.evac.aidCalledSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.aidCalledSig = null;
    }
  }

  onTeamsDeployed() {
    if (this.evac.teamsDeployed) {
      this.evac.teamsDeployedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.teamsDeployedSig = null;
    }
  }

  onLockoutAuthorized() {
    if (this.evac.lockoutAuthorized) {
      this.evac.lockoutAuthorizedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.lockoutAuthorizedSig = null;
    }
  }

  onLockedOut() {
    if (this.evac.lockedOut) {
      this.evac.lockedOutSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.lockedOutSig = null;
    }
  }

  onLiftMaintenanceConfirmed() {
    if (this.evac.liftMaintenanceConfirmed) {
      this.evac.liftMaintenanceConfirmedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.liftMaintenanceConfirmedSig = null;
    }
  }

  onEvacInitiated() {
    if (this.evac.evacInitiated) {
      this.evac.evacInitiatedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.evacInitiatedSig = null;
    }
  }

  onPersonnelCleared() {
    if (this.evac.personnelCleared) {
      this.evac.personnelClearedSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.personnelClearedSig = null;
    }
  }

  onStoodDown() {
    if (this.evac.stoodDown) {
      this.evac.stoodDownSig = new Date().toLocaleTimeString() + ", " + this.currentUser.lastName;
    } else {
      this.evac.stoodDownSig = null;
    }
  }
}
