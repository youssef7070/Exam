import { Injectable, inject } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import AuthEndPoint from './enums/AuthEndPoints';
import { AuthAdaptorService } from './adaptor/auth-adaptor.service';
import { LoginReq, LoginRes } from './interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {

  private readonly http = inject(HttpClient)

  private readonly _AuthAdaptorService = inject(AuthAdaptorService)


  // login
  login(data: LoginReq): Observable<LoginRes | string> {

    return this.http.post<LoginRes>(AuthEndPoint.LOGIN, data)
      .pipe(map((res: any) => this._AuthAdaptorService.adapt(res)), catchError((err) => of(err)))

  }





  // register
  // register(data:any):Observable<any>
  // return


  // resetPassword
  // resetPassword(data:any):Observable<any>
  // return


}




