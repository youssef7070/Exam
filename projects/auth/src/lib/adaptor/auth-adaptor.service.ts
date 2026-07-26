import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor.interface';
import { LoginRes } from '../interfaces/login.interface';


@Injectable({
    providedIn: 'root'
})


export class AuthAdaptorService implements Adaptor {

    // res (interface)
    adapt(data: any): LoginRes {

        return {
            message: data.message,
            token: data.token,
            email: data.user.email
        }

    }


}
