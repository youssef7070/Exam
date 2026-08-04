import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Features/auth/services/auth.service';

// for app pages 
export const authGuard: CanActivateFn = () => {

  //  navigate
  const router = inject(Router);
  // service
  const authService = inject(AuthService);
  // ssr
  const platformId = inject(PLATFORM_ID);

  // app use ssr not csr
  // to avoid any conflict
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // check the Authenticate
  if (authService.isAuthenticated()) {
    return true;
  }

  // else
  return router.createUrlTree(['/login']);
};

// ----------------------------

// for auth pages
export const guestGuard: CanActivateFn = () => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/home']);
  }

  return true;

};