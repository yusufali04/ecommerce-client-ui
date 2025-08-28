'use client';
import React from 'react';
import { z } from 'zod';
import { Coins, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import OrderSummary from './orderSummary';
import AddAdress from './addAddress';
import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/lib/http/api';
import { Address, Customer } from '@/lib/types';

const formSchema = z.object({
    address: z.string().nonempty("Please select an address."),
    paymentMode: z.enum(["card", "cash"]).refine((val) => val, {
        message: "You need to select a payment mode type.",
    }),
    comment: z.any(),
});

const CustomerForm = () => {
    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ['customer'],
        queryFn: async () => {
            return await getCustomer().then((res) => res.data);
        }
    });

    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    if (isLoading) {
        return <div className='max-w-screen-lg mx-auto mt-16'>Loading...</div>
    }
    if (!customer) {
        return <div className='max-w-screen-lg mx-auto mt-16'>Unable to get customer details</div>
    }
    return (
        <Form {...customerForm}>
            <form>
                <div className="flex container max-w-screen-lg mx-auto gap-6 mt-16">
                    <Card className="w-3/5 border-none">
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input
                                        id="fname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer.firstName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input
                                        id="lname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer.lastName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer.email}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="name">Address</Label>
                                            <AddAdress customerId={customer._id} />
                                        </div>

                                        <FormField
                                            name="address"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                className="grid grid-cols-2 gap-6 mt-2">
                                                                {
                                                                    customer?.addresses.map((address) => {
                                                                        return (
                                                                            <Card key={address.text}
                                                                                className="p-6">
                                                                                <div className="flex items-center space-x-2">
                                                                                    <FormControl>
                                                                                        <RadioGroupItem value={address.text} id={address.text} />
                                                                                    </FormControl>
                                                                                    <Label htmlFor={address.text} className="leading-normal">
                                                                                        {
                                                                                            address.text
                                                                                        }
                                                                                    </Label>
                                                                                </div>
                                                                            </Card>
                                                                        );
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Payment Mode</Label>
                                    <FormField
                                        name="paymentMode"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="flex gap-6">
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'card'}
                                                                        id={'card'}
                                                                        className="peer sr-only"
                                                                        aria-label={'card'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'card'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <CreditCard size={'20'} />
                                                                    <span className="ml-2">
                                                                        Card
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'cash'}
                                                                        id={'cash'}
                                                                        className="peer sr-only"
                                                                        aria-label={'cash'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'cash'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <Coins size={'20'} />
                                                                    <span className="ml-2 text-md">
                                                                        Cash
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">Comment</Label>
                                    <FormField
                                        name="comment"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <OrderSummary />
                </div>
            </form>
        </Form>
    );
};

export default CustomerForm;