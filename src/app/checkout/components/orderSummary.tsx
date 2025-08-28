import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/store/hooks';
import { getItemTotal } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

// Store and fetch this from the restaurant database
const TAXES_PERCENTAGE = 18;
// Store and fetch this from the restaurant database
const DELIVERY_CHARGES = 50;
const OrderSummary = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const subTotal = useMemo(() => {
        return cartItems.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0)
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        return (subTotal * discountPercentage) / 100;
    }, [subTotal, discountPercentage]);

    const taxesAmount = useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return (amountAfterDiscount * TAXES_PERCENTAGE) / 100;
    }, [subTotal, discountAmount]);

    const grandTotal = useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
    }, [subTotal, taxesAmount, discountAmount]);
    return (
        <Card className="w-2/5 border-none h-auto self-start">
            <CardHeader>
                <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span className="font-bold">₹{taxesAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-bold">₹{DELIVERY_CHARGES}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-bold">₹{discountAmount}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                    <span className="font-bold">Order total</span>
                    <span className="font-bold flex flex-col items-end">
                        <span className={'line-through text-gray-400'}>
                            ₹{grandTotal}
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                    />
                    {/* todo: add loading */}
                    <Button type='button' variant={'outline'}>
                        Apply
                    </Button>
                </div>

                <div className="text-right mt-6">
                    <Button type='submit'>
                        <span>Place order</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;