export interface ICreateUser {
    email: string,
    role: 'admin' | 'doctor' | 'viewer'
}
export interface ILoginUser{
    email: string,
    password: string
}