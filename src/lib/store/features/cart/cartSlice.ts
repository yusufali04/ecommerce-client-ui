import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Product, Topping } from '@/lib/types'
import { hashTheItem } from '@/lib/utils';

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
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
            const hash = hashTheItem(action.payload)
            const newItem = {
                ...action.payload,
                hash: hash
            }
            window.localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, newItem]))
            return {
                cartItems: [...state.cartItems, newItem]
            }
        },
        setInitialCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload || []
        },
        changeQty: (state, action: PayloadAction<{ hash: string; qty: number }>) => {
            const index = state.cartItems.findIndex((item) => item.hash === action.payload.hash);

            if (action.payload.qty === 0) {
                state.cartItems.splice(index, 1);
                window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                return;
            }
            // 1 , -1
            // 0 -> 1 = 1
            // 1 -> -1 1 + -1 = 0
            state.cartItems[index].qty = Math.max(
                1,
                state.cartItems[index].qty + action.payload.qty
            );

            window.localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: () => {
            window.localStorage.setItem('cartItems', JSON.stringify([]));
            return {
                cartItems: [],
            };
        },
    },
})

export const { addToCart, setInitialCart, changeQty, clearCart } = cartSlice.actions

export default cartSlice.reducer;