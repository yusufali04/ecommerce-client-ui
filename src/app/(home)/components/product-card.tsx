
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import React, { Suspense } from 'react'
import { Product } from '@/lib/types';
import ProductModal from './product-modal';
import { ProductCardSkeleton } from './skeleton';

type PropType = {
    product: Product
}

const ProductCard = ({ product }: PropType) => {
    return (
        <Card className='border-none rounded-xl'>
            <CardHeader className='flex items-center justify-center'>
                <div className='w-[200px] h-[200px] overflow-hidden rounded-md'>
                    <Image alt="pizza-image" className='w-full h-full object-cover' src={product.image} width={200} height={200} />
                </div>
            </CardHeader>
            <CardContent>
                <h2 className='text-md font-bold'>{product.name}</h2>
                <p className='mt-1 text-sm truncate w-40'>{product.description}</p>
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
                <p>
                    <span className='text-sm'>From </span>
                    <span className='font-bold text-sm'>₹{100}</span>
                </p>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    )
}

export default ProductCard;