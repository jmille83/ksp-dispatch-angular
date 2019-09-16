import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LiftEvac } from '../../objects/lift-evac';
import { LiftEvacService } from '../../services/lift-evac.service';
import { MatDialog } from '@angular/material';
import { LiftEvacNewComponent } from '../dialogs/lift-evac-new/lift-evac-new.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lift-evac-home',
  templateUrl: './lift-evac-home.component.html',
  styleUrls: ['./lift-evac-home.component.css']
})
export class LiftEvacHomeComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  evacs: LiftEvac[];

  constructor(private liftEvacService: LiftEvacService, private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.subscription.add(this.liftEvacService.getAllLiftEvacs().subscribe(evacs => {
      this.evacs = evacs;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewEvac() {
    const dialogRef = this.dialog.open(LiftEvacNewComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goToEvacDetail(result);
      }
    });
  }

  goToEvacDetail(lift: string) {
    let id = this.liftEvacService.addLiftEvac(lift);
    this.router.navigateByUrl("/lift-evac/" + id);
  }
}
