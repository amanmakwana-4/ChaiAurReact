import {configureStore} from '@reduxjs/toolkit'
import weatherReducer from '../features/weatherFeature/WeatherSlice'
export const store = configureStore({
    reducer:{
        weather: weatherReducer
    }
})