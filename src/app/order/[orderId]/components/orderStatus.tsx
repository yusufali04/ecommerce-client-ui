'use client';
import React from 'react'
import { Step, StepItem, Stepper, useStepper } from '@/components/stepper';
import { CheckCheck, CookingPot, FileCheck, Microwave, Package, PackageCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSingleOrder } from '@/lib/http/api';
import { Order } from '@/lib/types';

const steps = [
    { label: 'Received', icon: FileCheck, description: 'We are confirming your order' },
    { label: 'Confirmed', icon: Package, description: 'We have started preparing your order' },
    { label: 'Preparing', icon: CookingPot, description: 'Ready for the pickup' },
    { label: 'Prepared', icon: Microwave, description: 'Ready for the pickup' },
    { label: 'Out for delivery', icon: PackageCheck, description: 'Driver is on the way' },
    { label: 'Delivered', icon: CheckCheck, description: 'Order completed' },
] satisfies StepItem[];

const statusMapping = {
    received: 0,
    confirmed: 1,
    preparing: 2,
    prepared: 3,
    out_for_delivery: 4,
    delivered: 5
} as { [key: string]: number }

const StepperChanger = ({ orderId }: { orderId: string }) => {
    const { setStep } = useStepper();
    const { data: order } = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const requiredFields = "orderStatus"
            return await getSingleOrder(orderId, requiredFields).then((res) => res.data);
        },
        refetchInterval: 5000
    })

    React.useEffect(() => {
        if (order) {
            const currentStep = statusMapping[order!.orderStatus] || 0;
            setStep(currentStep + 1)
        }
    }, [order, setStep])
    return <></>;
}

const OrderStatus = ({ orderId }: { orderId: string }) => {
    return (
        <Stepper initialStep={0} steps={steps} variant='circle-alt' className='py-8'>
            {
                steps.map(({ label, icon }) => {
                    return <Step key={label} label={label} icon={icon} checkIcon={icon} />
                })
            }
            <StepperChanger orderId={orderId} />
        </Stepper>
    )
}

export default OrderStatus