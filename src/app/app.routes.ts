import { Routes } from '@angular/router';
import { authRoutes } from './Features/auth/auth.routes';
import { authGuard } from './Core/auth/auth.guard';
import { HomeComponent } from './Features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Home'
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'Home'
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: 'login'
  }
];