import { Injectable, signal } from '@angular/core';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts = signal<ContactModel[]>([]);

  constructor() {}

  addContact(contact: ContactModel): void {
    this.contacts.update((contacts) => [contact, ...contacts]);
  }
}
