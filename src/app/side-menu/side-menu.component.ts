import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  peaks = ["Frontside", "North Peak", "Outback"];
  worksheets = ["10-33", "10-minute Lift Evac"];

  constructor() { }

  ngOnInit() {
  }

}
