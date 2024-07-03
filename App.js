
import './App.css';
import P from './P';
import './App.css'

import wind from './img/wind.png';
import clearsky from './img/clearsky.jpg';
import cloud from './img/cloud.png';
import drizzle from './img/drizzle.png';
import imm from './img/imm.png';
import rain from './img/rain.png';
import searchh from './img/searchh.png';
import snow from './img/snow.png';
import windd from './img/win.png'


import { useState } from 'react';


const WeatherDetails =({icon ,temp,city,country,lat,log,humidity,win}) =>{
 return (
  <>
  <div className='image'>
    <img src={icon} alt='image' ></img>
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={imm} alt='humidity' className='icon' width={40}></img>
      <div className='data'>
        <div className='humidity-percent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windd} alt='wind' className='icon' width={40}></img>
      <div className='data'>
        <div className='wind-percent'>{win}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
  </div>
  </>
 )
}


function App() {
  let api_key = "07aca8d9be6df9e0f8969460bcd27b63";
  const [text,setText] = useState("america")
  
  const [icon,setIcon] = useState(wind);
  const [temp,setTemp] = useState(0);
  const [city,seCity] = useState("chennai");
  const [country,setCountry] = useState("IN");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0);
  const[humidity,setHumidity] = useState(0);
  const[win,setWin] = useState(0);

  const[cityNotFound , setCityNotFound] = useState(false);
  const[loading,setLoading] = useState(false);

  
  //47 min ,11sec
  const weatherIconMap ={
    "01d": clearsky,
    "01n": clearsky,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle ,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async () =>{
    setLoading(true);
     let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
     
  
//40 min errrrrrrrrror
    try{
      let res = await fetch(url);
      let data = await res.json();
     if(data.cod === "404") {
      console.error("city is not found");
      cityNotFound(true);
      setLoading(false);
      return;
     }
    

     setHumidity(data.main.humidity);
     setWin(data.win.speed);
     setTemp(Math.floor(data.main.temp));
     seCity(data.name);
     setCountry(data.sys.country);
     setLat(data.coord.lat);
     setLog(data.coord.lcon)
     const weatherIconMap = data.weather[0].icon;
     setIcon(weatherIconMap ); //45min errrrorrrr
     cityNotFound(false);
      
    } catch(error){
      console.error("An  error occurred:", error.message);

    }finally{
      setLoading(false);

    }
  } ;

  //33min
  const pk = (e) =>{
   setText(e.target.value)

  };
  const pkk = (e) =>{
    if(e.key==="Enter"){
      search();
    }
  }
  return (
   <>
   <div className='container'>
    <br></br>
    <div className='input-container'>
      <input type='text'
       className='cityinput'
       placeholder='Search City' 
       onChange={pk}
       value={text}
       onKeyDown={pkk}></input>
       
       <div className='Search-icon' onClick={()=>
        search()}>
        <img src={searchh} alt='search' width={20}></img>
       </div>
    </div>
   
   <WeatherDetails icon={wind} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} win={win}/>
   <P/>
   <p className='copyright'>
    Disigned by <span>PRAVEEN KUMAR</span>
    
   </p>
   </div>
   
   </>
  );
}

export default App;
