import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LinksService } from '../../services/links.service';
import { take } from 'rxjs/operators';
import { LinkGroup } from '../../objects/link-group';
import { Link } from '../../objects/link';

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.component.html',
  styleUrls: ['./useful-links.component.css']
})
export class UsefulLinksComponent implements OnInit {

  linkGroups: LinkGroup[];

  constructor(public authService: AuthService, private linksService: LinksService) { }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.linksService.getUsefulLinks()
    .pipe(take(1)).subscribe(linkGroups => {
      this.linkGroups = linkGroups as LinkGroup[];
    });
  }

  canDisplay(link: Link) {
    if (link.roles["dispatch"] && !this.authService.isDispatch(this.authService.getCurrentUser())) {
      return false;
    }
    return true;
  }
}
