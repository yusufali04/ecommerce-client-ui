import { cookies } from "next/headers";
import * as cookie from 'cookie';

export async function POST() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
            Cookie: `refreshToken=${cookies().get('refreshToken')?.value}`
        }
    });
    if (!response.ok) {
        console.log("Failed to refresh token");

        return Response.json({ success: false });
    }
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes('accessToken'));
    const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));
    if (!accessToken || !refreshToken) {
        console.log("Token not found");
        return Response.json({ success: false });
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
    return Response.json({ success: true });
}