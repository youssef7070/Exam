import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {

  private readonly http = inject(HttpClient)

  private baseUrl = environment.baseUrl;

  // ---- Users ---

  getDiplomas(params?: any): Observable<any> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.limit !== undefined) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
      if (params.sortBy) {
        httpParams = httpParams.set('sortBy', params.sortBy);
      }
      if (params.sortOrder) {
        httpParams = httpParams.set('sortOrder', params.sortOrder);
      }
      if (params.immutable !== undefined) {
        httpParams = httpParams.set('immutable', params.immutable.toString());
      }
      if (params.search && params.search.trim()) {
        httpParams = httpParams.set('search', params.search.trim());
      }
    }

    return this.http.get<any>(`${this.baseUrl}/diplomas`, { params: httpParams });
  }


  //  Get a single diploma by ID

  getDiplomaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/diplomas/${id}`);
  }


}
