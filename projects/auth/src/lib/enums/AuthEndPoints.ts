const baseURL = 'https://exam.elevateegy.com/api/v1/auth' as const

export default class AuthEndPoint {

    static readonly LOGIN = `${baseURL}/signin`;

    static readonly REGISTER = `${baseURL}/signup`;

    static readonly CHANGEPASSWORD = `${baseURL}/changePassword`;

    static readonly DELEYEACCTOUNT = `${baseURL}/deleteMe`;

    static readonly EDITPROFILE = `${baseURL}/editProfile`;

    static readonly LOGOUT = `${baseURL}/logout`;

}