export interface Iuser {
    user: User
}

export interface User {
    id: string
    username: string
    email: string
    phone: string
    firstName: string
    lastName: string
    profilePhoto: string
    emailVerified: boolean
    phoneVerified: boolean
    role: string
    createdAt: string
    updatedAt: string
}
