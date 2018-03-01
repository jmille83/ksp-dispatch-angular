import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.component.html',
  styleUrls: ['./openings.component.css']
})
export class OpeningsComponent implements OnInit {

  peak: string = "";

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .forEach(params => {
      this.peak = this.route.snapshot.paramMap.get('peak');
    });
  }

  ngon

}
