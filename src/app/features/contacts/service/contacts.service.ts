import { Injectable, inject, signal } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable()
export class ContactsService {
  private _http = inject(HttpClient);
  private resource = 'http://localhost:5000/contacts';

  getContacts(): Observable<ContactModel[]> {
    return this._http
      .get<ContactModel[]>(`${this.resource}?_sort=name&_order=asc`)
      .pipe(first());
  }

  getContact(id: string): Observable<ContactModel> {
    return this._http.get<ContactModel>(`${this.resource}/${id}`).pipe(first());
  }

  addContact(contact: ContactModel): Observable<ContactModel> {
    return this._http.post<ContactModel>(this.resource, contact).pipe(first());
  }

  updateContact(contact: ContactModel): Observable<ContactModel> {
    return this._http
      .put<ContactModel>(`${this.resource}/${contact.id}`, contact)
      .pipe(first());
  }

  deleteContact(contact: ContactModel): Observable<void> {
    return this._http
      .delete<void>(`${this.resource}/${contact.id}`)
      .pipe(first());
  }
}
