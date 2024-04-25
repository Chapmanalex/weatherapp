
// import './App.css';
import React, { useState } from 'react';

const api = {
  key: "d158d5e47d3397f1c2cb2f3e4a866e93",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = (evt) => {
    if (evt.key === "Enter") 
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          return;
        });
    }}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 17) ? 'app warm' : 'app'): 'app'}>
   
     <main>
        <div className="search-box">
          <input 
          type="text"
          id='search'
          className="search-bar"
          placeholder="search ...." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />

        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="weather-box">
            <div className="temp">
              {/* 15°C */}
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              {/* sunny */}
              {weather.weather[0].main}
              </div>
          </div>
        </div>
      </div>):('not found')}
      </main>
    </div>
  );
}
export default App;
