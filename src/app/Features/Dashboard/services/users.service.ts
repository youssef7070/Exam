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


    //   Get current user profile

    getUserProfile(): Observable<string> {
        return this.http.get<any>(`${this.baseUrl}/profile`);
    }

    // use payload as parameter

    //    Update profile 
    updateUserProfile(payload: { firstName?: string; lastName?: string; profilePhoto?: string; phone?: string }): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/profile`, payload);
    }

    //  Change password (authenticated)

    changePassword(payload: { oldPassword?: string; newPassword?: string }): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/change-password`, payload);
    }


    //  Request email change (sends verification code to new email)

    requestEmailChange(payload: { newEmail: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/email/request`, payload);
    }

    // Confirm email change with code

    confirmEmailChange(payload: { code: string }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/email/confirm`, payload);
    }

    // Delete own account 

    deleteAccount(): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}/account`);
    }



}