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

  constructor(public authService: AuthService, private linksService: LinksService, public dialog: MatDialog) { }

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
    if (link.roles["dispatch"] && !this.authService.isDispatch(this.authService.getCurrentUser())) {
      return false;
    }
    return true;
  }

  isSpecialist() {
    return this.authService.isSpecialist(this.authService.getCurrentUser());
  }

  onEditButtonClicked(link: Link, linkGroup: LinkGroup) {
    const dialogRef = this.dialog.open(LinkEditComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
