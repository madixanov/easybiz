import type { SessionsInterface } from './sessions.ts'
export interface UserInterface {
    Activation?: Array<any>
    Ban?: Array<any>
    Sessions?: Array<SessionsInterface>
    createdAt?: string,
    email?: string,
    facebook?: string,
    id?: string,
    image?: string,
    instagram?: string,
    password?: string,
    roleId?: string,
    status?: string,
    telegram?: string,
    updatedAt?: string,
    username?: string,
    was_online?: string,
}