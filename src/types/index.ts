export interface ICreateUser {
    email: string,
    password: string,
    role: 'admin' | 'superadmin' | 'viewer'
}