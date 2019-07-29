import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LinksService } from '../../services/links.service';
import { take } from 'rxjs/operators';
import { LinkGroup } from 'src/app/objects/link-group';

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
      this.linkGroups.forEach(group => {
        console.log(group.name + ": ");
        group.links.forEach(link => {
          console.log(link.text + ": " + link.link);
          if (link.roles["dispatch"]) {
            console.log("(Dispatch only)")
          }
        });  
      });
    });
  }
}
