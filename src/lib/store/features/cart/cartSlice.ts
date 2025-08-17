import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface CartState {
    value: number
}

// Define the initial state using that type
const initialState: CartState = {
    value: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    },
})

export const { increment } = cartSlice.actions

export default cartSlice.reducer;