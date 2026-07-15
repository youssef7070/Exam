import { Routes } from '@angular/router';
import { Register } from './Features/auth/components/register/register';

export const routes: Routes = [
    // Default 
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: '', redirectTo: 'create-new-password', pathMatch: 'full' },

    // Login

    {
        path: 'login',
        loadComponent: () => import('./Features/auth/components/login/login').then(m => m.Login),
        title: 'Login'
    },

    // Register

    {
        path: "register",
        loadComponent: () => import('./Features/auth/components/register/register').then(m => m.Register),
        title: "Register"
    },

    // Forget Password

    {
        path: 'forget-step-email',
        loadComponent: () => import('./Features/auth/components/Forget-Password/forget-step-email/forget-step-email').then(m => m.ForgetStepEmail),
        title: 'Forget Step Email'
    },
    {
        path: 'message-reset-password',
        loadComponent: () => import('./Features/auth/components/Forget-Password/forget-message-reset-password/forget-message-reset-password').then(m => m.ForgetMessageResetPassword),
        title: 'Forget Reset Password Message'
    },
    {
        path: 'create-new-password',
        loadComponent: () => import('./Features/auth/components/Forget-Password/creata-new-password/creata-new-password').then(m => m.CreataNewPassword),
        title: 'Create New Password'
    }



];