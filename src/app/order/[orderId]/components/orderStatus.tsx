'use client';
import React from 'react'
import { Step, StepItem, Stepper, useStepper } from '@/components/stepper';
import { CheckCheck, FileCheck, Microwave, Package, PackageCheck } from 'lucide-react';

const steps = [
    { label: 'Received', icon: FileCheck, description: 'We are confirming your order' },
    { label: 'Confirmed', icon: Package, description: 'We have started preparing your order' },
    { label: 'Prepared', icon: Microwave, description: 'Ready for the pickup' },
    { label: 'Out for delivery', icon: PackageCheck, description: 'Driver is on the way' },
    { label: 'Delivered', icon: CheckCheck, description: 'Order completed' },
] satisfies StepItem[];

const StepperChanger = () => {
    const { setStep, nextStep } = useStepper();
    React.useEffect(() => {
        setInterval(() => {
            nextStep()
        }, 2000)
    }, [nextStep])
    return <></>;
}

const OrderStatus = () => {
    return (
        <Stepper initialStep={0} steps={steps} variant='circle-alt' className='py-8'>
            {
                steps.map(({ label, icon }) => {
                    return <Step key={label} label={label} icon={icon} checkIcon={icon} />
                })
            }
            <StepperChanger />
        </Stepper>
    )
}

export default OrderStatus