import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  peaks = [
    {name: "Frontside", value: "frontside"}, 
    {name: "North Peak", value: "north-peak"}, 
    {name: "Outback", value: "outback"}];
  worksheets = ["10-33", "10-minute Lift Evac"];

  constructor() { }

  ngOnInit() {
  }

}
