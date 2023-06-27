import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ContactsFacadeService } from '../../facades/contacts-facade.service';
import { ContactModel } from '../../models/contact.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  private _facade = inject(ContactsFacadeService);
  private _dialog = inject(MatDialog);
  private _router = inject(Router);

  contacts = this._facade.contacts;

  onEdit(contact: ContactModel): void {
    this._router.navigate(['contacts', contact.id, 'edit'], { state: { contact } });
  }

  onDelete(contact: ContactModel): void {
    const dialogRef = this.openConfirmationDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._facade.removeContact(contact);
      }
    });
  }

  private openConfirmationDialog() {
    return this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: $localize`Delete`,
        subtitle: $localize`Delete contact`,
        message: $localize`Do you really want to delete this contact`,
      },
    });
  }
}
