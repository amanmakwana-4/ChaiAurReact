import { useSelector } from "react-redux"
import SearchBar from "./components/SearchBar"
import Loader from "./components/Loader"
import WeatherCard from "./components/WeatherCard"
import './App.css'
import Error from "./components/Error"
function App() {
  const status = useSelector((state)=>state.weather.status)
  
  return (
  <>
    <div className="weather-app">
      <h1 className="app-title">Weather App</h1>
        <SearchBar />
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        <WeatherCard />
    </div>
  </>
  )
}

export default App
