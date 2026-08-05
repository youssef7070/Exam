import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {



    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.baseUrl;

    /**
     * GET /api/questions/exam/{examId}
     * Get all questions for an exam with optional sorting and filtering
     */
    getQuestionsByExam(examId: string, options?: any): Observable<any> {
        let params = new HttpParams();

        if (options) {
            if (options.sortBy) {
                params = params.set('sortBy', options.sortBy);
            }
            if (options.sortOrder) {
                params = params.set('sortOrder', options.sortOrder);
            }
            if (options.immutable !== undefined && options.immutable !== null) {
                params = params.set('immutable', options.immutable);
            }
            if (options.search) {
                params = params.set('search', options.search);
            }
        }

        return this.http.get<any>(`${this.baseUrl}/questions/exam/${examId}`, { params });
    }

    /**
     * GET /api/questions/{id}
     * Get question details by ID
     */
    getQuestionById(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/questions/${id}`);
    }
}