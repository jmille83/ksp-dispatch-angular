import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable'
import { LinkGroup } from '../objects/link-group';
import { Link } from '../objects/link';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private db: AngularFirestore, private transactionService: TransactionService) { }

  getUsefulLinks(): Observable<any[]> {
    return this.db.collection('useful-links-groups', ref => ref.orderBy('order', 'asc')).valueChanges();
  }

  getLinksForGroup(group: LinkGroup): Observable<any[]> {
    return this.db.collection('useful-links-groups').doc(group.id).collection('links').valueChanges();
  }

  addLinkToGroup(link: Link, group: LinkGroup) {
    link.id = this.db.createId();
    group.links.push(link);
    let newData = JSON.parse(JSON.stringify(group));
    this.transactionService.writeDataToDocForCollection(newData, group.id, 'useful-links-groups');
  }

  updateLink(link: Link, group: LinkGroup) {
    let i = group.links.indexOf(group.links.find(l => l.id === link.id));
    group.links[i] = link;
    let newData = JSON.parse(JSON.stringify(group));
    this.transactionService.writeDataToDocForCollection(newData, group.id, 'useful-links-groups');
  }

  deleteLink(link: Link, group: LinkGroup) {
    group.links = this.manualDelete(group.links, link);
    let newData = JSON.parse(JSON.stringify(group));
    this.transactionService.writeDataToDocForCollection(newData, group.id, 'useful-links-groups');
  }

  // Neither splice nor filter worked properly ¯\_(ツ)_/¯
  manualDelete(links: Link[], target: Link) : Link[] {
    let ret = [];
    links.forEach(link => {
      if (link.id === target.id) {
      } else {
        ret.push(link);
      }
    });
    return ret;
  }
}
