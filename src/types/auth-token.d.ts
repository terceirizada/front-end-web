import { User } from "./user"
export type AuthToken = {
    user : User
    token: string
    exp: string
}