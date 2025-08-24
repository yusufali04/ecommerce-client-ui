'use server'
import * as cookie from 'cookie';
import { cookies } from 'next/headers';

export default async function login(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password')

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (!response.ok) {
            const error = await response.json();
            return {
                type: 'error',
                message: error.errors[0].msg
            }
        }
        const c = response.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));
        if (!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'No cookies were found'
            }
        }
        const parsedAccessToken = cookie.parse(accessToken);
        const parsedRefreshToken = cookie.parse(refreshToken);
        cookies().set({
            name: 'accessToken' as string,
            value: parsedAccessToken.accessToken as string,
            expires: new Date(parsedAccessToken.expires as string),
            httpOnly: parsedAccessToken.httpOnly as unknown as boolean || true,
            path: parsedAccessToken.path,
            domain: parsedAccessToken.Domain,
            sameSite: parsedAccessToken.SameSite as 'strict'
        })
        cookies().set({
            name: 'refreshToken' as string,
            value: parsedRefreshToken.refreshToken as string,
            expires: new Date(parsedRefreshToken.expires as string),
            httpOnly: parsedRefreshToken.httpOnly as unknown as boolean || true,
            path: parsedRefreshToken.path,
            domain: parsedRefreshToken.Domain,
            sameSite: parsedRefreshToken.SameSite as 'strict'
        })
        return {
            type: 'success',
            message: 'Login successful'
        }
    } catch (err: any) {
        return {
            type: 'error',
            message: err.message
        }
    }
}