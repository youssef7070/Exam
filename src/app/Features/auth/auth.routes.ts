// import { Routes } from '@angular/router';
// import { guestGuard } from '../../Core/auth/auth.guard';

// export const authRoutes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
//     children: [
//       { path: '', redirectTo: 'login', pathMatch: 'full' },

//       {
//         path: 'login',
//         canActivate: [guestGuard],
//         loadComponent: () =>
//           import('./components/login/login').then((m) => m.Login),
//         title: 'Login',
//       },
//       {
//         path: 'register',
//         canActivate: [guestGuard],
//         loadComponent: () =>
//           import('./components/register/register').then((m) => m.Register),
//         title: 'Register',
//       },
//       {
//         path: 'forget-step-email',
//         canActivate: [guestGuard],
//         loadComponent: () =>
//           import('./components/Forget-Password/forget-step-email/forget-step-email').then(
//             (m) => m.ForgetStepEmail,
//           ),
//         title: 'Forget Step Email',
//       },
//       {
//         path: 'message-reset-password',
//         canActivate: [guestGuard],
//         loadComponent: () =>
//           import(
//             './components/Forget-Password/forget-message-reset-password/forget-message-reset-password'
//           ).then((m) => m.ForgetMessageResetPassword),
//         title: 'Forget Reset Password Message',
//       },
//       {
//         path: 'create-new-password',
//         loadComponent: () =>
//           import('./components/Forget-Password/creata-new-password/creata-new-password').then(
//             (m) => m.CreataNewPassword,
//           ),
//         title: 'Create New Password',
//       },
//     ],
//   },
// ];


import { Routes } from '@angular/router';
import { guestGuard } from '../../Core/auth/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout').then(
        (m) => m.AuthLayout
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./components/login/login').then((m) => m.Login),
        title: 'Login',
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./components/register/register').then((m) => m.Register),
        title: 'Register',
      },
      {
        path: 'forget-step-email',
        canActivate: [guestGuard],
        loadComponent: () =>
          import(
            './components/Forget-Password/forget-step-email/forget-step-email'
          ).then((m) => m.ForgetStepEmail),
        title: 'Forget Step Email',
      },
      {
        path: 'message-reset-password',
        canActivate: [guestGuard],
        loadComponent: () =>
          import(
            './components/Forget-Password/forget-message-reset-password/forget-message-reset-password'
          ).then((m) => m.ForgetMessageResetPassword),
        title: 'Forget Reset Password Message',
      },
      {
        path: 'create-new-password',
        loadComponent: () =>
          import(
            './components/Forget-Password/creata-new-password/creata-new-password'
          ).then((m) => m.CreataNewPassword),
        title: 'Create New Password',
      },
    ],
  },
];