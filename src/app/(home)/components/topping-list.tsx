import React, { useEffect, useState } from 'react'
import ToppingCard from './topping-card'
import { Topping } from '@/lib/types'


const ToppingList = () => {
    const [toppings, setToppings] = useState<Topping[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=5`)
            if (!toppingResponse.ok) {
                return;
            }
            const toppings = await toppingResponse.json();
            setToppings(toppings.data)
        }
        fetchData();
    }, [])
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((element: Topping) => element._id === topping._id)
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter((elm: Topping) => elm._id !== topping._id));
            return;
        }
        setSelectedToppings((prev) => [...prev, topping])
    }
    return (
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
}

export default ToppingList