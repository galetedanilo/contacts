import { Injectable, inject } from '@angular/core';
import { ContactsStateService } from '../states/contacts-state.service';
import { ContactModel } from '../models/contact.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactsFacadeService {
  private _state = inject(ContactsStateService);
  private _router = inject(Router);

  contacts = this._state.contacts;
  contactDetails = this._state.contactsDetails;
  totalContacts = this._state.totalContacts;

  addContacts(contact: ContactModel): void {
    const record = { ...contact, id: Date.now().toString() };
    this._state.addContact(record);
    this._router.navigate(['/']);
  }

  editContact(contact: ContactModel): void {
    this._state.editContact(contact);
    this._router.navigate(['/']);
  }

  getContactt(id: string): void {
    this._state.getContact(id);
  }

  removeContact(contact: ContactModel): void {
    this._state.removeContact(contact);
  }
}
