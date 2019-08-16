import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  @Output() onLinkClicked = new EventEmitter<boolean>();

  authSubscriber: Subscription;
  currentUserName = "No one";

  peaks = [
    {name: "Frontside", value: "frontside"}, 
    {name: "North Peak", value: "north-peak"}, 
    {name: "Outback", value: "outback"}];
  
  worksheets = ["10-33", "10-minute Lift Evac"];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { 
    this.authSubscriber = this.authService.getAuthState$().subscribe((auth) => {
      if (auth !== null) {
        this.currentUserName = auth.email;
      } else {
        this.currentUserName = "No one";
      }
    });
  }

  ngOnDestroy() {
    this.authSubscriber.unsubscribe();
  }

  linkClicked() {
    this.onLinkClicked.emit();
  }

  logoutClicked() {
    this.linkClicked();
    this.authService.logout();
    
    // Not sure why the navigation from AuthService isn't working -- keeping this here
    //   as a temp fix. Will it end up staying forever? Probably.
    this.router.navigate(['/login']);

    this.currentUserName = "No one";
  }
}
