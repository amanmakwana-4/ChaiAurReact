import {configureStore} from '@reduxjs/toolkit'
import weatherReducer from '../features/wheatherFeature/WheatherSlice'
export const store = configureStore({
    reducer:{
        weather: weatherReducer
    }
})