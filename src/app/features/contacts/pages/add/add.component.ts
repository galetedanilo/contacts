import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { ContactsFacadeService } from '../../facades/contacts-facade.service';
import { ContactModel } from '../../models/contact.model';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ContactFormComponent
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  #facade = inject(ContactsFacadeService);

  onSubmit(contact: ContactModel): void {
    this.#facade.addContacts(contact);
  }
}
