import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthLayoutComponent,children: [
      { path: '', loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)}
    ]
  },
  { path: '', component: AdminLayoutComponent, canActivate: [authGuard], children: [
      { path: '', loadComponent: () => import('./features/dashboard/pages/home/home.component').then(m => m.HomeComponent)}
    ]
  }

];
