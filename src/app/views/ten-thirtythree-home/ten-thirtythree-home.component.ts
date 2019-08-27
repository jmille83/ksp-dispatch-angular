import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordsService } from '../../services/records.service';
import { Record } from '../../objects/record';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ten-thirtythree-home',
  templateUrl: './ten-thirtythree-home.component.html',
  styleUrls: ['./ten-thirtythree-home.component.css']
})
export class TenThirtythreeHomeComponent implements OnInit, OnDestroy {

  list1033s: Record[];
  subscription = new Subscription();

  constructor(private recordsService: RecordsService) { }

  ngOnInit() {
    this.subscription.add(this.recordsService.get1033sForSeason().subscribe(list => {
      this.list1033s = list;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
