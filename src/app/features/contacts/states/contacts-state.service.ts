import { Injectable, computed, signal } from '@angular/core';
import { ContactModel, INIT_CONTACT_VALUES } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsStateService {
  contacts = signal<ContactModel[]>([]);
  contactsDetails = signal<ContactModel>(INIT_CONTACT_VALUES);
  totalContacts = computed(() => this.contacts().length);

  addContact(contact: ContactModel): void {
    this.contacts.update((contacts) => [contact, ...contacts]);
  }

  editContact(contact: ContactModel): void {
    const index = this.contacts().findIndex((data) => data.id === contact.id);

    if (index >= 0) {
      this.contacts.mutate((values) => (values[index] = contact));
    }
  }

  getContact(id: string): void {
    const contact = this.contacts().find((data) => data.id === id);

    if (contact) {
      this.contactsDetails.update((_) => contact);
    }
  }

  removeContact(contact: ContactModel): void {
    this.contacts.update((contacts) =>
      contacts.filter((c) => c.id !== contact.id)
    );
  }
}
