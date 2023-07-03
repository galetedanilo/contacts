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
  private _facade = inject(ContactsFacadeService);

  contact = this._facade.contactDetails;

  @Input()
  id!: string;

  ngOnInit(): void {
    this._facade.getContactDetails(this.id);
  }
}
