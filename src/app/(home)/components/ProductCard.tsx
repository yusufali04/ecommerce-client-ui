import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react'

export type Product = {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

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
                    <span className='font-bold text-sm'>₹{product.price}</span>
                </p>
                <Button size="sm" className='bg-orange-200 hover:bg-orange-300 text-orange-500 px-5 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'>Select</Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard;