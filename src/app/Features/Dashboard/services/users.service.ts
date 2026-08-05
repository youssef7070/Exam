import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.baseUrl}/users`;

    /**
     * GET /api/users/profile
     * Get current user profile
     */
    getUserProfile(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/profile`);
    }

    /**
     * PATCH /api/users/profile
     * Update profile (firstName, lastName, profilePhoto, phone)
     */
    updateUserProfile(payload: { firstName?: string; lastName?: string; profilePhoto?: string; phone?: string }): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/profile`, payload);
    }

    /**
     * POST /api/users/change-password
     * Change password (authenticated)
     */
    changePassword(payload: { oldPassword?: string; newPassword?: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/change-password`, payload);
    }

    /**
     * POST /api/users/email/request
     * Request email change (sends verification code to new email)
     */
    requestEmailChange(payload: { newEmail: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/email/request`, payload);
    }

    /**
     * POST /api/users/email/confirm
     * Confirm email change with code
     */
    confirmEmailChange(payload: { code: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/email/confirm`, payload);
    }

    /**
     * DELETE /api/users/account
     * Delete own account (disabled for super admin)
     */
    deleteAccount(): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/account`);
    }



}