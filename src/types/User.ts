import { Rate } from './Rate'
export interface User {
    id: string
    username: string
    password: string
    rate?: Rate
    rate_id?: string
}
