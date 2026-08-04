import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {



  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;


  getExamsByDiploma(diplomaId?: string): Observable<any> {
    let params = new HttpParams();
    if (diplomaId) {
      params = params.set('diplomaId', diplomaId);
    }
    return this.http.get<any>(`${this.baseUrl}/exams`, { params });
  }




}
