import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Product, Topping } from '@/lib/types'

export interface CartItem {
    product: Product;
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string
        };
        selectedToppings: Topping[];
    };
}
// Define a type for the slice state
interface CartState {
    cartItems: CartItem[]
}

// Define the initial state using that type
const initialState: CartState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = {
                product: action.payload.product,
                chosenConfiguration: action.payload.chosenConfiguration,
            }
            window.localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, newItem]))
            return {
                cartItems: [...state.cartItems, newItem]
            }
        },
        setInitialCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload || []
        }
    },
})

export const { addToCart, setInitialCart } = cartSlice.actions

export default cartSlice.reducer;