import { Component, OnInit, Inject } from '@angular/core';
import { Opening } from 'src/app/objects/opening';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../openings/openings.component';
import { OpeningsService } from '../../../services/openings.service';

@Component({
  selector: 'app-opening-edit',
  templateUrl: './opening-edit.component.html',
  styleUrls: ['./opening-edit.component.css']
})
export class OpeningEditComponent implements OnInit {

  opening: Opening;
  openingOrClosing: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData,
    public openingsService: OpeningsService) {

      this.opening = data.opening;
      this.openingOrClosing = data.type;
  }

  ngOnInit() {
  }

  onSubmitClicked() {
    this.openingsService.updateOpeningWithType(this.opening, this.openingOrClosing);
  }

}
