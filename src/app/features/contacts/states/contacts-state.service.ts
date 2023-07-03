import { Injectable, computed, signal } from '@angular/core';
import { ContactModel, INIT_CONTACT_VALUES } from '../models/contact.model';

@Injectable()
export class ContactsStateService {
  contacts = signal<ContactModel[]>([]);
  contactDetails = signal<ContactModel>(INIT_CONTACT_VALUES);
  totalContacts = computed(() => this.contacts().length);

  getContact(id: string): void {
    const contact = this.contacts().find((contact) => {
      return contact.id == id;
    });

    if (contact) {
      this.contactDetails.set(contact);
    }
  }

  addContact(contact: ContactModel): void {
    this.contacts.update((contacts) => [contact, ...contacts]);
  }

  updateContact(contact: ContactModel, id?: string): void {
    const index = this.getContactIndex(id ?? contact.id);

    if (index >= 0) {
      this.contacts.mutate((values) => (values[index] = contact));
    }
  }

  deleteContact(contact: ContactModel): void {
    this.contacts.update((contacts) =>
      contacts.filter((c) => c.id !== contact.id)
    );
  }

  setContact(contact: ContactModel): void {
    this.contactDetails.set(contact);
  }

  setContacts(contacts: ContactModel[]): void {
    this.contacts.set(contacts);
  }

  private getContactIndex(id: string): number {
    return this.contacts().findIndex((contact) => contact.id === id);
  }
}
