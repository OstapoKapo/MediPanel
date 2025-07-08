export interface ICreateUser {
    email: string,
    password: string,
    role: 'admin' | 'superadmin' | 'viewer'
}
export interface ILoginUser{
    email: string,
    password: string
}