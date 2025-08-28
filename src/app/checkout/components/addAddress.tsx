import { LoaderCircle, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/lib/http/api';

const formSchema = z.object({
    address: z.string().min(2, {
        message: 'Address must be at least 2 characters.',
    }),
});

const AddAdress = ({ customerId }: { customerId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const addressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['address', customerId],
        mutationFn: async (address: string) => {
            return await addAddress(customerId, address)
        },
        onSuccess: () => {
            addressForm.reset();
            setIsModalOpen(false);
            return queryClient.invalidateQueries({ queryKey: ['customer'] });
        }
    })
    const handleAddAddress = async (data: z.infer<typeof formSchema>) => {
        await mutate(data.address);
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'link'}>
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(handleAddAddress)}>
                        <DialogHeader>
                            <DialogTitle>Add Address</DialogTitle>
                            <DialogDescription>
                                Your address will be saved for your next order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <FormField
                                    name="address"
                                    control={addressForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea className="mt-2" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {isError && <p className='text-sm text-red-600'>Something went wrong. Please try again later.</p>}
                            <Button type="submit" disabled={isPending}>
                                {
                                    isPending ? (
                                        <>
                                            <LoaderCircle className="animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : "Save changes"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddAdress;