import { cookies } from "next/headers"
import { Session, User } from "./types"

export const getSession = async () => {
    return await getSelf()
}

const getSelf = async (): Promise<Session | null> => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`
        }
    })
    if (!response.ok) {
        return null;
    }
    return { user: await response.json() as User }
}