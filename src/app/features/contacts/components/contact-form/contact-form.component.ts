import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ContactModel, INIT_CONTACT_VALUES } from '../../models/contact.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @Input() data: ContactModel = INIT_CONTACT_VALUES;
  @Output() formValues = new EventEmitter<ContactModel>();

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(40),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(4),
      Validators.maxLength(40),
    ]),
    phone: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.form.setValue(this.data);
  }

  onSubmit(): void {
    this.formValues.emit(this.form.getRawValue() as ContactModel);
  }
}
