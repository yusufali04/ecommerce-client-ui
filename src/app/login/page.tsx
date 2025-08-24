'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import login from '@/lib/actions/login';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <Button disabled={pending}>{pending ? (<div className='flex items-center gap-2'><LoaderCircle className='animate-spin' /> <span>Logging in</span></div>) : 'Login'}</Button>
}

const initialState = {
    type: '',
    message: ''
};
const Login = () => {

    const [state, formAction] = useFormState(login, initialState);
    return (
        <div className="max-h-[calc(100vh-64px)] w-full lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <SubmitButton />
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/login-image.webp"
                    width={1920}
                    height={1080}
                    style={{ objectFit: 'cover' }}
                    alt="Image"
                    className="h-screen"
                />
            </div>
        </div>
    )
}

export default Login;