import { Injectable, inject } from '@angular/core';
import { ContactsStateService } from '../states/contacts-state.service';
import { ContactModel } from '../models/contact.model';
import { Router } from '@angular/router';
import { ContactsService } from '../service/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ContactsFacadeService {
  private _state = inject(ContactsStateService);
  private _service = inject(ContactsService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  contacts = this._state.contacts;
  contactDetails = this._state.contactDetails;
  totalContacts = this._state.totalContacts;

  getContacts(): void {
    this._service.getContacts().subscribe({
      next: (contatcts) => {
        this._state.setContacts(contatcts);
      },
      error: (error) => {
        this.openSnackBar($localize`Error to get contacts`);
      },
    });
  }

  getContactDetails(id: string): void {
    this._state.getContact(id);

    this._service.getContact(id).subscribe({
      next: (data: ContactModel) => {
        this._state.setContact(data);
      },
      error: (_) => {
        this.openSnackBar($localize`Error to find the contact`);
        this._router.navigate(['/']);
      },
    });
  }

  addContacts(contact: ContactModel): void {
    const fakeId = Date.now().toString();

    this._state.addContact({ ...contact, id: fakeId });

    this._service.addContact(contact).subscribe({
      next: (contact: ContactModel) => {
        this._state.updateContact(contact, fakeId);
        this.openSnackBar($localize`New contact success create`);
      },
      error: (error: HttpErrorResponse) => {
        this._state.deleteContact({ ...contact, id: fakeId });
        this.openSnackBar($localize`Error to create a new contact`);
      },
    });
    this._router.navigate(['/']);
  }

  editContact(contact: ContactModel): void {
    this._state.getContact(contact.id);
    this._state.updateContact(contact);

    this._service.updateContact(contact).subscribe({
      next: (data: ContactModel) => {
        this.openSnackBar($localize`Updata contact success`);
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBar($localize`Error to update contact`);
        this._state.updateContact(this._state.contactDetails())
      },
    });
    this._router.navigate(['/']);
  }

  removeContact(contact: ContactModel): void {
    this._state.deleteContact(contact);
    this._service.deleteContact(contact).subscribe({
      next: () => {
        this.openSnackBar($localize`Contact deleted`);
      },
      error: () => {
        this._state.addContact(contact);
        this.openSnackBar($localize`Error to delete contact`);
      },
    });
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
