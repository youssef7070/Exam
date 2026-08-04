import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iauth } from '../models/iauth.interface';

const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly http = inject(HttpClient);
    // use ssr
    private readonly platformId = inject(PLATFORM_ID);
    // base api
    private baseUrl = environment.baseUrl;

    // save token in local storage
    setToken(token: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(TOKEN_KEY, token);
        }
    }

    // get token from local storage
    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    }

    // clear token from local storage
    clearToken(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    // check the Authenticate
    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token && token !== 'undefined' && token !== 'null';
    }

    // -------------Service -------------

    // Send email verification
    SendOtp(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/send-email-verification`, data);
    }

    // Confirm email verification
    ConfirmOtp(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/confirm-email-verification`, data);
    }

    // Register
    Register(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/register`, data);
    }

    // Login
    Login(data: { username: string; password: string }): Observable<Iauth> {
        return this.http.post<Iauth>(`${this.baseUrl}/auth/login`, data);
    }

    // Forgot Password
    ForgotPassword(email: string): Observable<any> {

        let redirectUrl = '';

        if (isPlatformBrowser(this.platformId)) {
            redirectUrl = `${window.location.origin}/create-new-password`;
        }

        return this.http.post(`${this.baseUrl}/auth/forgot-password`, {
            email: email,
            redirectUrl: redirectUrl
        });

    }

    // Reset Password
    ResetPassword(data: { token: string; newPassword: string; confirmPassword: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/reset-password`, data);
    }

}