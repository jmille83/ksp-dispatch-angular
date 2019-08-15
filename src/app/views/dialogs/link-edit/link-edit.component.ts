import { Component, OnInit, Inject } from '@angular/core';
import { Link } from '../../../objects/link';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../useful-links/useful-links.component';
import { LinkGroup } from '../../../objects/link-group';
import { LinksService } from '../../../services/links.service';

@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent implements OnInit {

  link: Link;
  linkGroup: LinkGroup;
  newMode: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<LinkEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public linksService: LinksService) {
      this.link = data.link;
      this.linkGroup = data.linkGroup

      if (this.link === null) {
        this.link = new Link();
        this.newMode = true;
      }
    }

  ngOnInit() {
  }

  onSubmitClicked() {
    if (this.newMode) {
      this.linksService.addLinkToGroup(this.link, this.linkGroup);
    } else {
      this.linksService.updateLink(this.link, this.linkGroup);
    }
  }

  onDeleteClicked() {
    this.linksService.deleteLink(this.link, this.linkGroup);
  }
}
