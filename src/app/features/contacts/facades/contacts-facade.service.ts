import { Injectable, inject } from '@angular/core';
import { ContactsStateService } from '../states/contacts-state.service';
import { ContactModel } from '../models/contact.model';
import { Router } from '@angular/router';
import { ContactsService } from '../service/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ContactsFacadeService {
  #state = inject(ContactsStateService);
  #service = inject(ContactsService);
  #router = inject(Router);
  #snackBar = inject(MatSnackBar);

  contacts = this.#state.contacts;
  contactDetails = this.#state.contactDetails;
  totalContacts = this.#state.totalContacts;

  getContacts(): void {
    this.#service.getContacts().subscribe({
      next: (contatcts) => {
        this.#state.setContacts(contatcts);
      },
      error: (error) => {
        this.openSnackBar($localize`Error to get contacts`);
      },
    });
  }

  getContactDetails(id: string): void {
    this.#state.getContact(id);

    this.#service.getContactByID(id).subscribe({
      next: (data: ContactModel) => {
        this.#state.setContact(data);
      },
      error: (_) => {
        this.openSnackBar($localize`Error to find the contact`);
        this.#router.navigate(['/']);
      },
    });
  }

  addContacts(contact: ContactModel): void {
    const fakeId = Date.now().toString();

    this.#state.addContact({ ...contact, id: fakeId });

    this.#service.addContact(contact).subscribe({
      next: (contact: ContactModel) => {
        this.#state.updateContact(contact, fakeId);
        this.openSnackBar($localize`New contact success create`);
      },
      error: (error: HttpErrorResponse) => {
        this.#state.deleteContact({ ...contact, id: fakeId });
        this.openSnackBar($localize`Error to create a new contact`);
      },
    });
    this.#router.navigate(['/']);
  }

  editContact(contact: ContactModel): void {
    this.#state.getContact(contact.id);
    this.#state.updateContact(contact);

    this.#service.updateContact(contact).subscribe({
      next: (data: ContactModel) => {
        this.openSnackBar($localize`Updata contact success`);
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBar($localize`Error to update contact`);
        this.#state.updateContact(this.#state.contactDetails())
      },
    });
    this.#router.navigate(['/']);
  }

  removeContact(contact: ContactModel): void {
    this.#state.deleteContact(contact);
    this.#service.deleteContact(contact).subscribe({
      next: () => {
        this.openSnackBar($localize`Contact deleted`);
      },
      error: () => {
        this.#state.addContact(contact);
        this.openSnackBar($localize`Error to delete contact`);
      },
    });
  }

  private openSnackBar(message: string): void {
    this.#snackBar.open(message, 'X', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
