import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2, CircleX, LayoutDashboard, Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Payment = ({ searchParams }: { searchParams: { success: string, orderId: string, restaurant: string } }) => {
    const isOrderSuccess = searchParams.success === 'true';
    return (
        <div className='flex flex-col items-center gap-4 w-full mt-10'>
            {
                isOrderSuccess ? (
                    <>
                        <CheckCircle2 size={80} className='text-green-500' />
                        <h1 className='text-xl font-bold mt-2 text-center'>Order placed successfully</h1>
                        <p className='text-base font-semibold -mt-2'>Thank you for your order!</p>
                    </>
                ) : (
                    <>
                        <CircleX size={80} className='text-red-500' />
                        <h1 className='text-xl font-bold mt-2 text-center'>Payment failed</h1>
                        <p className='text-base font-semibold -mt-2'>Failed to place your order. Please try again</p>
                    </>
                )
            }
            {
                isOrderSuccess && (
                    <Card className='mt-6'>
                        <CardHeader className='p-4'>
                            <CardTitle className='flex items-center items-start text-lg justify-between gap-12'>
                                <div className='flex items-center gap-3'>
                                    <Store size={35} className='text-primary' />
                                    <span>Your order information</span>
                                </div>
                                <Badge className='text-base px-4' variant={'secondary'}>Confirmed</Badge>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className='pt-6'>
                            <div className='flex items-center gap-2'>
                                <LayoutDashboard size={20} />
                                <h2 className='text-base font-medium'>Order reference: </h2>
                                <Link href={`/order-status/${searchParams.orderId}`} className='underline'>{searchParams.orderId}</Link>
                            </div>
                            <div className='flex items-center gap-2 mt-2'>
                                <LayoutDashboard size={20} />
                                <h2 className='text-base font-medium'>Payment Status: </h2>
                                <span>Paid</span>
                            </div>
                        </CardContent>
                    </Card>
                )
            }
            {
                isOrderSuccess ? (
                    <Button asChild className="mt-6">
                        <Link href={`/order-status/${searchParams.orderId}?restaurant=${searchParams.restaurant}`}>
                            <ArrowLeft size={20} className='text-white' />
                            <span>Track order</span>
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="mt-6">
                        <Link href={`/checkout?restaurant=${searchParams.restaurant}`}>
                            <ArrowLeft size={20} className='text-white' />
                            <span>Try Again</span>
                        </Link>
                    </Button>
                )
            }

        </div>
    )
}

export default Payment;