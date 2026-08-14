import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../Features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Excluding authentication paths
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const token = inject(AuthService).getToken();

  if (token) {
    // make copy from token to can edit
    const cloned = req.clone({
      setHeaders: {
        token: token,
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // if there arent token
  return next(req);

};