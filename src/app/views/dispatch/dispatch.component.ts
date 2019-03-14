import { Component, OnInit } from '@angular/core';

import { Record } from '../../objects/record'
import { User } from '../../objects/user'
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  currentRecord = new Record();
  user: User;
  subscription: Subscription = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRecordClicked(record: Record) {
    this.currentRecord = record;
  }
}
