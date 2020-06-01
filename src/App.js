import React, { useState } from 'react';



function App() {
  const api = {
    key: 'f3ead3bab235cbd0a00086645d75853b',
    urlBase: 'https://api.openweathermap.org/data/2.5/'
  }
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.urlBase}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "Jan.",
      "Feb.",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec."
    ];
    let days = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
  }



  return (
    <div
      className={(typeof weather.main != 'undefined' ?
        (weather.main.temp < 15 ? 'cold' : 'app') : 'app')} >
      <div>
        <div className="searchbar-container">
          <input
            type="text"
            className="searchbar"
            placeholder="Search..."
            value={query}
            onKeyPress={search}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        {(typeof weather.main != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
                {weather.main.temp.toFixed(1)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (''))}
      </div>
    </div>
  );
}

export default App;
