export async function fetchWeatherByCity(city) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  )

  if (!res.ok) {
    throw new Error("City not found")
  }

  return res.json()
}
