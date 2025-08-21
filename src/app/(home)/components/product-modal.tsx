'use client'
import React, { Suspense, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ToppingList from './topping-list';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Product, Topping } from '@/lib/types';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addToCart, CartItem } from '@/lib/store/features/cart/cartSlice';
import { hashTheItem } from '@/lib/utils';

type ChosenConfig = {
    [key: string]: string;
}

const ProductModal = ({ product }: { product: Product }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const toppingsQueryData = {
        tenantId: product.tenantId,
        categoryId: product.category._id
    }
    const dispatch = useAppDispatch();
    const defaultConfiguration = Object.entries(product.category.priceConfiguration).map(([key, value]) => {
        return { [key]: value.availableOptions[0] }
    }).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(defaultConfiguration as unknown as ChosenConfig);

    const handleAddToCart = () => {
        const itemToAdd = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig!,
                selectedToppings: selectedToppings
            },
            qty: 1,
        }
        dispatch(addToCart(itemToAdd))
        setDialogOpen(false)
    }
    const handleRadioChange = (key: string, data: string) => {
        setChosenConfig((prev) => {
            return { ...prev, [key]: data }
        })
    }
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
    const totalPrice = useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);
        const configPrice = Object.entries(chosenConfig).reduce((acc, [key, value]: [string, string]) => {
            const price = product.priceConfiguration[key].availableOptions[value]
            return acc + price
        }, 0)
        return configPrice + toppingsTotal;
    }, [chosenConfig, selectedToppings, product])

    const alreadyHasInCart = useMemo(() => {
        const currentConfiguration: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: { ...chosenConfig },
                selectedToppings: selectedToppings
            },
            qty: 1
        }
        const hash = hashTheItem(currentConfiguration);
        return cartItems.some((item) => item.hash === hash)
    }, [product, chosenConfig, selectedToppings, cartItems])

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((element: Topping) => element._id === topping._id)
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter((elm: Topping) => elm._id !== topping._id));
            return;
        }
        setSelectedToppings((prev) => [...prev, topping])
    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className='bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 text-xs'>Select</DialogTrigger>
            <DialogContent className='max-w-3xl p-0'>
                <div className='flex'>
                    <div className='w-1/3 bg-white rounded-lg p-8 flex items-center justify-center'>
                        <div>
                            <Image alt="pizza-image" className='w-full h-full object-cover rounded-md' src={product.image} width={150} height={150} />
                        </div>
                    </div>
                    <div className='w-2/3 p-8'>
                        <h3 className='text-md font-bold'>{product.name}</h3>
                        <p className='mt-1'>{product.description}</p>
                        {
                            Object.entries(product.category.priceConfiguration).map(([key, value]) => {
                                return <div key={key}>
                                    <h4 className='mt-6 text-sm'>Choose the {key}</h4>
                                    <RadioGroup
                                        onValueChange={(data) => {
                                            handleRadioChange(key, data)
                                        }}
                                        defaultValue={value.availableOptions[0]}
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        {
                                            value.availableOptions.map((option) => {
                                                return <div key={option}>
                                                    <RadioGroupItem
                                                        aria-label={option}
                                                        id={option}
                                                        value={option}
                                                        className="peer sr-only"
                                                    />
                                                    <Label
                                                        htmlFor={option}
                                                        className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        {option}
                                                    </Label>
                                                </div>
                                            })
                                        }
                                    </RadioGroup>
                                </div>
                            })
                        }
                        {
                            // make this dynamic by adding a hasToppings flag in the database for each category
                            <Suspense fallback={"Loading toppings"}>
                                <ToppingList queryData={toppingsQueryData} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                            </Suspense>
                        }
                        <div className='flex items-center justify-between mt-12'>
                            <span className='font-bold'>&#8377;{totalPrice}</span>
                            <Button className={alreadyHasInCart ? 'bg-gray-700' : 'bg-primary'} disabled={alreadyHasInCart} onClick={handleAddToCart}><ShoppingCart /> <span>{alreadyHasInCart ? "Added to cart" : "Add to cart"}</span></Button>

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal;