import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/pages/home/home.component')
            .then(m => m.HomeComponent)
      }
    ]
  }

];
