import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order } from '@/lib/types'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const statusVariant: Record<
    string,
    "default" | "secondary" | "destructive" | "outline" | undefined
> = {
    received: "secondary",
    confirmed: "default",
    preparing: "destructive",
    ready_for_delivery: "outline",
    out_for_delivery: "secondary",
    delivered: "default",
};

const Orders = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/order/orders/mine`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}` // include auth token if needed
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch orders")
    }
    const orders: Order[] = await response.json() || [];

    return (
        <Card className='max-w-screen-lg mx-auto mt-10'>
            <CardHeader>
                <CardTitle className='text-lg'>My Orders</CardTitle>
                <p className='text-sm'>Your order history</p>
            </CardHeader>
            <CardContent>
                {
                    orders.length === 0 ? (
                        <div className='text-center py-10'>
                            <p className='text-sm'>You have no orders yet. <Link href="/" className='text-primary underline'>Go place an order</Link></p>
                        </div>
                    )
                        :
                        <Table>
                            <TableHeader className='bg-muted h-[50px]'>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead className="text-left">Payment Status</TableHead>
                                    <TableHead className="text-left">Payment Mode</TableHead>
                                    <TableHead className="text-left">Date/Time</TableHead>
                                    <TableHead className="text-center">Order Status</TableHead>
                                    <TableHead className="text-center">Amount</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    orders.map((order: Order) => {
                                        return (
                                            <TableRow key={order._id} className='h-[70px]'>
                                                <TableCell className="font-medium">{order._id}</TableCell>
                                                <TableCell className="text-left">{(order.paymentStatus).charAt(0).toUpperCase() + (order.paymentStatus).slice(1).toLowerCase()}</TableCell>
                                                <TableCell className="text-left">{(order.paymentMode).charAt(0).toUpperCase() + (order.paymentMode).slice(1).toLowerCase()}</TableCell>
                                                <TableCell className="text-left">{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant={statusVariant[order.orderStatus] ?? "default"}>
                                                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1).toLowerCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">₹{order.total}</TableCell>
                                                <TableCell className="text-right text-primary underline"><Link href={`/order/${order._id}`}>More details</Link></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                }

            </CardContent>
        </Card>
    )
}

export default Orders