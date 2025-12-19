import {useSelector} from 'react-redux'
import '../App.css'
const WeatherCard = () => {
    const {data,status} = useSelector((state)=>state.weather)
    if(status !=='succeeded') return null
  return (
    <div className="weather-card">
      <h2>{data.location.name}</h2>
      <p>{data.current.condition.text}</p>
      <h1>{data.current.temp_c}°C</h1>
      <p>Humidity: {data.current.humidity}%</p>
      <p>Wind: {data.current.wind_kph} km/h</p>
    </div>
  )
}

export default WeatherCard