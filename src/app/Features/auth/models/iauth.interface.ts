export interface Iauth {
    status: boolean
    code: number
    message?: string
    payload: Payload
}

export interface Payload {
    user: User
    token: string
}

export interface User {
    id: string
    username: string
    email: string
    phone: string
    firstName: string
    lastName: string
    emailVerified: boolean
    phoneVerified: boolean
    role: string
}
