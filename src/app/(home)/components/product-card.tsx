import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import React from 'react'
import ToppingList from './topping-list';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';


type PropType = {
    product: Product
}

const ProductCard = ({ product }: PropType) => {
    return (
        <Card className='border-none rounded-xl'>
            <CardHeader className='flex items-center justify-center'>
                <Image alt="pizza-image" src={product.image} width={150} height={150} />
            </CardHeader>
            <CardContent>
                <h2 className='text-md font-bold'>{product.name}</h2>
                <p className='mt-1 text-sm'>{product.description}</p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
                <p>
                    <span className='text-sm'>From </span>
                    <span className='font-bold text-sm'>₹{100}</span>
                </p>
                <Dialog>
                    <DialogTrigger className='bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 text-xs'>Select</DialogTrigger>
                    <DialogContent className='max-w-3xl p-0'>
                        <div className='flex'>
                            <div className='w-1/3 bg-white rounded-lg p-8 flex items-center justify-center'>
                                <Image alt="pizza-image" src={product.image} width={150} height={150} />
                            </div>
                            <div className='w-2/3 p-8'>
                                <h3 className='text-md font-bold'>{product.name}</h3>
                                <p className='mt-1'>{product.description}</p>
                                <div>
                                    <h4 className='mt-6 text-sm'>Choose the size</h4>
                                    <RadioGroup
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem
                                                aria-label='Small'
                                                id='small'
                                                value='small'
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor='small'
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Small
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                aria-label='Medium'
                                                id='medium'
                                                value='medium'
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor='medium'
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Medium
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                aria-label='Large'
                                                id='large'
                                                value='large'
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor='large'
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Large
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <h4 className='mt-6 text-sm'>Choose the crust</h4>
                                    <RadioGroup
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem
                                                aria-label='Thin'
                                                id='thin'
                                                value='thin'
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor='thin'
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Thin
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                aria-label='Thick'
                                                id='thick'
                                                value='thick'
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor='thick'
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Thick
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <ToppingList />
                                <div className='flex items-center justify-between mt-12'>
                                    <span className='font-bold'>&#8377;400</span>
                                    <Button><ShoppingCart /> <span>Add to cart</span></Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;