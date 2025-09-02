import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { verifyCoupon } from '@/lib/http/api';
import { useAppSelector } from '@/lib/store/hooks';
import { VerifyCouponData } from '@/lib/types';
import { getItemTotal } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';

// Store and fetch this from the restaurant database
const TAXES_PERCENTAGE = 18;
// Store and fetch this from the restaurant database
const DELIVERY_CHARGES = 50;
const OrderSummary = ({ handleCouponCodeChange }: { handleCouponCodeChange: (code: string) => void }) => {
    const [discountError, setDiscountError] = useState('')
    const searchParams = useSearchParams();
    const couponCodeRef = useRef<HTMLInputElement>(null);
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const subTotal = useMemo(() => {
        return cartItems.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0)
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        return parseFloat(((subTotal * discountPercentage) / 100).toFixed(2));
    }, [subTotal, discountPercentage]);

    const taxesAmount = useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return parseFloat(((amountAfterDiscount * TAXES_PERCENTAGE) / 100).toFixed(2));
    }, [subTotal, discountAmount]);

    const grandTotalWithDiscount = useMemo(() => {
        return parseFloat((subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES).toFixed(2));
    }, [subTotal, taxesAmount, discountAmount]);

    const grandTotalWithoutDiscount = useMemo(() => {
        return parseFloat((subTotal + taxesAmount + DELIVERY_CHARGES).toFixed(2));
    }, [subTotal, taxesAmount]);

    const { mutate } = useMutation({
        mutationKey: ['couponCode'],
        mutationFn: async () => {
            const tenantId = searchParams.get('restaurant');
            if (!couponCodeRef.current?.value || !tenantId) return;
            const code = couponCodeRef.current?.value;
            return await verifyCoupon({ code, tenantId }).then(res => res.data);
        },
        onSuccess: (data) => {
            setDiscountError("")
            if (data.valid) {
                setDiscountPercentage(data.discount);
                handleCouponCodeChange(couponCodeRef.current?.value || '');
                return;
            }
            setDiscountError("Coupon code expired");
            handleCouponCodeChange('')
            setDiscountPercentage(0);
            return;
        },
        onError: () => {
            setDiscountPercentage(0);
            setDiscountError("Invalid coupon code");
        }
    },
    )
    const handleApplyCoupon = (e: React.MouseEvent) => {

        e.preventDefault();
        mutate();
    }
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
                    <span className="font-bold">Order total:</span>
                    <span className="font-bold flex flex-col items-end">
                        <span className={discountPercentage ? 'line-through text-gray-400' : ''}>
                            ₹{grandTotalWithoutDiscount}
                        </span>
                        {
                            discountPercentage ? (
                                <span className="text-green-500 font-bold">
                                    ₹{grandTotalWithDiscount}
                                </span>
                            ) : null
                        }
                    </span>
                </div>
                {
                    discountError ? (
                        <div className="text-red-500 text-sm">
                            {discountError}
                        </div>
                    ) : null}
                <div className="flex items-center gap-4">

                    <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                        ref={couponCodeRef}
                    />
                    {/* todo: add loading */}
                    <Button onClick={handleApplyCoupon} type='button' variant={'outline'}>
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