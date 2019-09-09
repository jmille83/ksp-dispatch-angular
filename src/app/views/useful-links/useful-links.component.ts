import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LinksService } from '../../services/links.service';
import { take } from 'rxjs/operators';
import { LinkGroup } from '../../objects/link-group';
import { Link } from '../../objects/link';
import { LinkEditComponent } from '../dialogs/link-edit/link-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.component.html',
  styleUrls: ['./useful-links.component.css']
})
export class UsefulLinksComponent implements OnInit {

  linkGroups: LinkGroup[];

  constructor(private authService: AuthService, private linksService: LinksService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.linksService.getUsefulLinks()
    .pipe(take(1)).subscribe(linkGroups => {
      linkGroups.forEach(linkGroup => {
        linkGroup.links = linkGroup.links.filter(link => this.canDisplay(link));
      });
      this.linkGroups = linkGroups as LinkGroup[];
    });
  }

  canDisplay(link: Link) {
    let user = this.authService.getCurrentUser();
    const line = link.roles['line'] && user.roles['line'];
    const spec = link.roles['specialist'] && user.roles['specialist'];
    const disp = link.roles['dispatch'] && user.roles['dispatch'];
    const sup = link.roles['sup'] && user.roles['sup'];
    const admin = user.roles['admin'];
    
    if (line || spec || disp || sup || admin) {
      return true;
    }
    return false;


    // if (link.roles["dispatch"] && !this.authService.isDispatch(this.authService.getCurrentUser())) {
    //   return false;
    // } else if (link.roles["specialist"] && !this.authService.isSpecialist(this.authService.getCurrentUser())) {
    //   return false;
    // } else  if (link.roles["sup"] && !this.authService.isSup(this.authService.getCurrentUser())) {
    //   return false;
    // }
    // return true;
  }

  isSpecialist() {
    return this.authService.isSpecialist(this.authService.getCurrentUser());
  }

  onEditButtonClicked(link: Link, linkGroup: LinkGroup) {
    this.dialog.open(LinkEditComponent, {
      data: { link: link,
              linkGroup: linkGroup}
    });
  }
}

export interface DialogData {
  link: Link;
  linkGroup: LinkGroup;
}
