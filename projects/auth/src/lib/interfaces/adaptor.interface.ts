import { LoginRes } from "./login.interface";

export interface Adaptor {

    adapt(data: any): LoginRes

}
