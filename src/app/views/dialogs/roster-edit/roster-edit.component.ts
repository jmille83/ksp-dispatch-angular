import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../../objects/user';
import { MAT_DIALOG_DATA, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { DialogData } from '../../roster/roster.component';
import { UserService } from '../../../services/user.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEditComponent implements OnInit {

  user: User;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  rolesFormControl = new FormControl();
  filteredRoles: Observable<string[]>;
  allRoles = ['sup', 'specialist', 'dispatch', 'line', 'north-peak', 'outback', 'kmc'];

  @ViewChild('rolesInput', {static: true}) rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) matAutocomplete: MatAutocomplete;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData, private userService: UserService) {
      this.user = data.user;

      this.filteredRoles = this.rolesFormControl.valueChanges.pipe(
        startWith(null),
        map((role: string | null) => role ? this._filter(role) : this.allRoles.slice()));
    }

  ngOnInit() {
  }

  onSubmitClicked() {
    this.userService.updateUser(this.user);
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add new role.
      if ((value || '').trim()) {
        this.user.roles[value.trim()] = true;
      }

      // Reset the input value.
      if (input) {
        input.value = '';
      }

      this.rolesFormControl.setValue(null);
    }
  }

  remove(role: string): void {
    this.user.roles[role] = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(role => role.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.user.roles[event.option.viewValue] = true;
    this.rolesInput.nativeElement.value = '';
    this.rolesFormControl.setValue(null);
  }
}
