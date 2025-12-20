import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counterFeatures/counterSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})