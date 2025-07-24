export interface ICreateUser {
    email: string,
    role: 'admin' | 'doctor' | 'viewer'
}
export interface ILoginUser{
    email: string,
    password: string
}

export interface IChangePassword {
    password: string,
    confirmPassword: string
}
export interface IUser{
    _id: string,
    email: string,
    role: 'admin' | 'doctor' | 'viewer',
    isVerified: boolean,
    createdAt: string,
    is2FA: boolean
}