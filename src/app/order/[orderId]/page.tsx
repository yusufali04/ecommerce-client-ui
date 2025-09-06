import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import OrderStatus from './components/orderStatus'
import { Separator } from '@/components/ui/separator'
import { Banknote, Coins, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import { Order } from '@/lib/types'

const SingleOrder = async ({ params }: { params: { orderId: string } }) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/order/orders/${params.orderId}?fields=paymentStatus,paymentMode,address,paymentReferenceId`, {
        headers: {
            "Authorization": `Bearer ${cookies().get('accessToken')?.value}`
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch order");
    }
    const order: Order = await response.json();

    return (
        <div className='flex flex-col gap-6 container max-w-screen-lg mx-auto mt-8'>
            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>Track the order - {order._id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <OrderStatus />
                </CardContent>
            </Card>
            <div className="flex gap-6">
                <Card className="w-1/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <h2 className="font-bold">
                            {order.customerId.firstName + " " + order.customerId.lastName}
                        </h2>
                        <p className="mt-2">{order.address}</p>
                    </CardContent>
                </Card>

                <Card className="w-2/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Your order information
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={20} />
                            <h2 className="text-base font-medium">{order.paymentReferenceId ? "Order reference: " : "Order reference:"} </h2>
                            <span>{order.paymentReferenceId ? order.paymentReferenceId : order._id}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Banknote />
                            <h2 className="text-base font-medium">Payment status: </h2>
                            <span>{order.paymentStatus.charAt(0).toUpperCase() + (order.paymentStatus).slice(1).toLowerCase()}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Coins size={20} />
                            <h2 className="text-base font-medium">Payment method: </h2>
                            <span>{(order.paymentMode).charAt(0).toUpperCase() + (order.paymentMode).slice(1).toLowerCase()}</span>
                        </div>

                        <Button variant={'destructive'} className="mt-6">
                            Cancel Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SingleOrder