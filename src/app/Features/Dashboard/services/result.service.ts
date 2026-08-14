import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubmissionsService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.baseUrl;

    /**
     * POST /api/submissions
     * Submit exam answers and receive submission results/score
     */
    submitExam(payload: { examId: string; answers: any[] }): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/submissions`, payload);
    }

    /**
     * GET /api/submissions
     * Get paginated exam submissions for the current user with optional search
     */
    getUserSubmissions(options?: { page?: number; limit?: number; search?: string }): Observable<any> {
        let params = new HttpParams();

        if (options) {
            if (options.page !== undefined && options.page !== null) {
                params = params.set('page', options.page.toString());
            }
            if (options.limit !== undefined && options.limit !== null) {
                params = params.set('limit', options.limit.toString());
            }
            if (options.search) {
                params = params.set('search', options.search);
            }
        }

        return this.http.get<any>(`${this.baseUrl}/submissions`, { params });
    }

    /**
     * GET /api/submissions/{id}
     * Get submission details with analytics by submission ID
     */
    getSubmissionById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/submissions/${id}`);
    }
}