import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWeatherByCity } from './wheatherApi.jsx'

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city, { rejectWithValue }) => {
    try {
      return await fetchWeatherByCity(city)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
    lastCity: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
        state.lastCity = action.payload.location.name
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default weatherSlice.reducer
