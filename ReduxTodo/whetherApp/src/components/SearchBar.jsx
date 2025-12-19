import { useState } from "react";
import {useDispatch} from 'react-redux'
import { getWeather } from "../features/wheatherFeature/WheatherSlice";
import '../App.css'
export default function SearchBar(){
    const [city,setCity]=useState("")
    const dispatch=useDispatch()
    function handleSearch(){
        if(!city.trim()) return
        dispatch(getWeather(city))
    }
    return(
        <>
        <div className="search-bar">
            <input
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              placeholder="Enter City"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        </>
    )
}