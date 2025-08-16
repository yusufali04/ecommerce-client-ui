'use client';
import React, { useState } from 'react'
import ToppingCard, { Topping } from './topping-card'

const toppings = [
    { id: '1', name: 'Chicken', image: '/chicken.png', price: 50, isAvailable: true },
    { id: '2', name: 'Cheese', image: '/cheese.png', price: 50, isAvailable: true },
    { id: '3', name: 'Jelapeno', image: '/jelapeno.png', price: 50, isAvailable: true }
]


const ToppingList = () => {
    const [selectedToppings, setSelectedToppings] = useState([toppings[0]])

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((element) => element.id === topping.id)
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter(elm => elm.id !== topping.id));
            return;
        }
        setSelectedToppings((prev) => [...prev, topping])
    }
    return (
        <section className='mt-6'>
            <h4 className='text-sm'>Extra toppings</h4>
            <div className='grid grid-cols-3 gap-4 mt-3'>
                {
                    toppings.map((topping) => {
                        return <ToppingCard key={topping.id} topping={topping} selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
                    })
                }
            </div>
        </section>
    )
}

export default ToppingList