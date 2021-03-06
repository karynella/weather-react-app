import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  let form = (
    <div className="weatherApp">
      <h1>Weather App</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          id="formInput"
          autoCapitalize="words"
          type="search"
          placeholder="Type a location to search"
          onChange={updateCity}
          incremental="true"
        />
        <button type="submit"> Search </button>
      </form>
    </div>
  );

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6988592e955ab4549707ca49836853a2&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleResponse(response) {
    let icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    setLoaded(true);
    setWeatherData(
      <div>
        <h2>In {city} the weather is:</h2>
        <ul>
          <li> Temperature: {Math.round(response.data.main.temp)}• C </li>
          <li> Description: {response.data.weather[0].description} </li>
          <li> Humidity: {Math.round(response.data.main.humidity)} % </li>
          <li> Wind: {Math.round(response.data.wind.speed)}m / sec </li>
          <p>
            <img src={icon} alt="" />
          </p>
        </ul>
      </div>
    );
  }

  if (loaded) {
    return (
      <div>
        {form}
        {weatherData}
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
