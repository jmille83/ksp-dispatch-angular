import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DirectoryService } from '../../../services/directory.service';
import { DialogData } from '../../directory/directory.component';
import { Contact } from '../../../objects/contact';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact: Contact;
  isEditingUser: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData,
    private directoryService: DirectoryService,
    private userService: UserService) {
      this.contact = data.contact;

      // Must be adding a new one.
      if (this.contact === null) {
        this.contact = new Contact();
      }

      // Don't let the editor delete a user.
      if (this.contact.userId) {
        this.isEditingUser = true;
      }    
  }

  ngOnInit() {
  }

  onSubmitClicked() {
    // Submit to user database.
    if (this.isEditingUser) {
      this.userService.updateUserFromContact(this.contact);

    // Submit to contact database.
    } else {
      // Create an id.
      if (!this.contact.id) {
        this.directoryService.addContact(this.contact);

      // Just update an existing contact.
      } else {
        this.directoryService.updateContact(this.contact);
      }
    }
  }

  onDeleteClicked() {
    this.directoryService.deleteContact(this.contact);
  }

}
