import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { DetailsComponent } from './pages/details/details.component';
import { ContactsService } from './service/contacts.service';
import { ContactsFacadeService } from './facades/contacts-facade.service';
import { ContactsStateService } from './states/contacts-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const contactsRoutes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    providers: [
      ContactsService,
      ContactsFacadeService,
      ContactsStateService,
      MatSnackBar,
    ],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: ':id/edit', component: EditComponent },
      { path: ':id/details', component: DetailsComponent },
    ],
  },
];
