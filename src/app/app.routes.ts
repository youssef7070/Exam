import { Routes } from '@angular/router';
import { authRoutes } from './Features/auth/auth.routes';
import { authGuard } from './Core/auth/auth.guard';
import { dashRoutes } from './Features/Dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/diplomas',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'dashboard/diplomas',
    pathMatch: 'full'
  },
  ...dashRoutes,
  ...authRoutes,
  {
    path: '**',
    redirectTo: 'dashboard/diplomas'
  }
];