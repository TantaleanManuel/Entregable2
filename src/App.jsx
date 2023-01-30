import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'

const API_KEY = "f7b6aa51ebae748c7c0c436c818722f3"

function App() {
const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temps, setTemps] = useState()
const [iscelsius, setisCelsius] = useState(true)

const success = (e) => {
  console.log(e)
  const newCoords = {
    lat: e.coords.latitude,
    lon: e.coords.longitude    
  }
  setCoords(newCoords)
  }
const changeUniTemp = () => setisCelsius(!iscelsius)

useEffect(() => {
  navigator.geolocation.getCurrentPosition(success)
}, [])

useEffect(() => {
  if(coords) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    axios.get(URL)
    .then(res => {
      setTimeout(() => {
      setWeather(res.data)
      const celsius = (res.data.main.temp - 273.15).toFixed(2);
      const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
      const newTemps = {celsius, fahrenheit}
      setTemps(newTemps)
      },1000)
    })
    .catch(err => console.log(err))
   } 
}, [coords])
  
  return (
    <div className="App">
    {
    weather ? (
      <WeatherCard
      weather={weather} 
      temps={temps} 
      iscelsius={iscelsius}
      changeUniTemp ={changeUniTemp}
      />
      ) : <Loader/>
}
    </div>
  )
}

export default App
