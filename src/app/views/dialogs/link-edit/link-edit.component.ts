import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Link } from '../../../objects/link';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { DialogData } from '../../useful-links/useful-links.component';
import { LinkGroup } from '../../../objects/link-group';
import { LinksService } from '../../../services/links.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent implements OnInit {

  link: Link;
  linkGroup: LinkGroup;
  newMode: boolean = false;
  title: string = "Edit link";

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  rolesFormControl = new FormControl();
  filteredRoles: Observable<string[]>;
  allRoles = ['line', 'sup', 'specialist', 'dispatch'];

  @ViewChild('rolesInput', {static: true}) rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) matAutocomplete: MatAutocomplete;
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData,
    private linksService: LinksService) {
      this.link = data.link;
      this.linkGroup = data.linkGroup

      if (this.link === null) {
        this.link = new Link();
        this.link.roles = {'line': true};
        this.title = "Add link";
        this.newMode = true;
      }

      this.filteredRoles = this.rolesFormControl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add new role.
      if ((value || '').trim()) {
        this.link.roles[value.trim()] = true;
      }

      // Reset the input value.
      if (input) {
        input.value = '';
      }

      this.rolesFormControl.setValue(null);
    }
  }

  remove(role: string): void {
    this.link.roles[role] = false;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.link.roles[event.option.viewValue] = true;
    this.rolesInput.nativeElement.value = '';
    this.rolesFormControl.setValue(null);
  }
}
