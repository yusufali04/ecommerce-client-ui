import React, { useEffect, useState } from 'react'
import ToppingCard from './topping-card'
import { Topping } from '@/lib/types'


const ToppingList = ({ selectedToppings, queryData, handleCheckBoxCheck }: { selectedToppings: Topping[], queryData: { categoryId: string, tenantId: string }, handleCheckBoxCheck: (topping: Topping) => void }) => {
    const [toppings, setToppings] = useState<Topping[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings/category/tenant?tenantId=${queryData.tenantId}&categoryId=${queryData.categoryId}`)
            if (!toppingResponse.ok) {
                return;
            }
            const toppings = await toppingResponse.json();
            setToppings(toppings)
        }
        fetchData();
    }, [])

    return (
        toppings?.length !== 0 && (
            <section className='mt-6'>
                <h4 className='text-sm'>Extra toppings</h4>
                <div className='grid grid-cols-3 gap-4 mt-3'>
                    {
                        toppings.map((topping: Topping) => {
                            return <ToppingCard key={topping._id} topping={topping} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                        })
                    }
                </div>
            </section>
        )
    )
}

export default ToppingList