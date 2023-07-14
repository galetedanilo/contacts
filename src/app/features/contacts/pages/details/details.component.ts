import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsFacadeService } from '../../facades/contacts-facade.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  #facade = inject(ContactsFacadeService);

  contact = this.#facade.contactDetails;

  @Input()
  id!: string;

  ngOnInit(): void {
    this.#facade.getContactDetails(this.id);
  }
}
