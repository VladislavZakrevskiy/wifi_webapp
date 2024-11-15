import { User } from "./User"

export interface Rate<WithUser = false> {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    stars: number
    users: WithUser extends true ? User[] : undefined
}
