'use client';
import React, { useCallback, useEffect, useRef } from 'react'
import * as jose from 'jose';

const TokenRefresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>();
    const getAccessToken = async () => {
        const res = await fetch('/api/auth/accessToken');
        if (!res.ok) return;
        const response = await res.json();
        return response.accessToken;
    }
    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return;
            }
            const token = jose.decodeJwt(accessToken);
            const exp = token.exp! * 1000; // convert to milliseconds
            const currentTime = Date.now();
            const refreshTime = exp - currentTime - 5000
            console.log(`current time: `, new Date(currentTime).toISOString());
            console.log(`Token expiry time: `, new Date(exp).toISOString());
            console.log(`Scheduled refresh time: `, new Date(currentTime + refreshTime).toISOString());
            timeoutId.current = setTimeout(async () => {
                await refreshAccessToken();
                console.log("Access token has been refreshed");
            }, refreshTime)

        } catch (err: any) {
            console.log("Failed to refresh token", err);
        }
    }, [])
    const refreshAccessToken = async () => {
        try {
            const res = await fetch('/api/auth/refresh', { method: 'POST' });
            if (!res.ok) {
                console.log("Failed to refresh token");
                return;
            };
        } catch (err: any) {
            console.log("Failed to refresh token", err);
        }

        startRefresh();
    }
    useEffect(() => {
        startRefresh();
        return () => {
            clearTimeout(timeoutId.current);
        }
    }, [timeoutId, startRefresh])

    return (
        <div>{children}</div>
    )
}

export default TokenRefresher;