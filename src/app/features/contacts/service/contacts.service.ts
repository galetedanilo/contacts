import { Injectable, inject, signal } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable()
export class ContactsService {
  #http = inject(HttpClient);
  #resource = 'http://localhost:5000/contacts';

  getContacts(): Observable<ContactModel[]> {
    return this.#http
      .get<ContactModel[]>(`${this.#resource}?_sort=name&_order=asc`)
      .pipe(first());
  }

  getContactByID(_id: string): Observable<ContactModel> {
    return this.#http.get<ContactModel>(`${this.#resource}/${_id}`).pipe(first());
  }

  addContact(_contact: ContactModel): Observable<ContactModel> {
    return this.#http.post<ContactModel>(this.#resource, _contact).pipe(first());
  }

  updateContact(_contact: ContactModel): Observable<ContactModel> {
    return this.#http
      .put<ContactModel>(`${this.#resource}/${_contact.id}`, _contact)
      .pipe(first());
  }

  deleteContact(_contact: ContactModel): Observable<void> {
    return this.#http
      .delete<void>(`${this.#resource}/${_contact.id}`)
      .pipe(first());
  }
}
