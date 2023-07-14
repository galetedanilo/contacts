import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ContactsFacadeService } from '../../facades/contacts-facade.service';
import { ContactModel } from '../../models/contact.model';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, MatCardModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  contact!: ContactModel;

  #facade = inject(ContactsFacadeService);
  #location =  inject(Location);
  #router = inject(Router);

  ngOnInit(): void {
   this.contact = (this.#location.getState() as any).contact as ContactModel;

   if (!this.contact) {
    this.#router.navigate(['/'])
   }
   
  }

  onSubmit(contact: ContactModel): void {
    this.#facade.editContact(contact);
  }
}
