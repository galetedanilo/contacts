import { Injectable, inject, signal } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _http = inject(HttpClient);
  private resource = '';

  constructor() {}

  addContact(contact: ContactModel): Observable<ContactModel> {
    return this._http.post<ContactModel>(this.resource, contact).pipe(first());
  }
}
