import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [

  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component')
            .then(m => m.LoginComponent)
      }
    ]
  },

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