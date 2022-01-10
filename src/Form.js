import React, { useState } from "react";
import axios from "axios";

export default function searchEngine() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    function handleResponse(response) {
        let icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        setLoaded(true);
        setWeatherData( <
            div >
            <
            h2 > { " " }
            In { city }
            the weather is: { " " } <
            /h2>{" "} <
            ul >
            <
            li > Temperature: { Math.round(response.data.main.temp) }•
            C < /li>{" "} <
            li > Description: { response.data.weather[0].description } < /li>{" "} <
            li > Humidity: { Math.round(response.data.main.humidity) } % < /li>{" "} <
            li > Wind: { Math.round(response.data.wind.speed) }
            m / sec < /li>{" "} <
            p >
            <
            img src = { icon }
            alt = "" / >
            <
            /p>{" "} <
            /ul> <
            /div>
        );
    }

    function updateCity(event) {
        setCity(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6988592e955ab4549707ca49836853a2&units=metric`;
        axios.get(url).then(handleResponse);
    }

    if (loaded) {
        return ( <
            div className = "weatherApp" >
            <
            form autoComplete = "off"
            onSubmit = { handleSubmit } >
            <
            input id = "formInput"
            autoCapitalize = "words"
            type = "search"
            placeholder = "Type a location to search"
            onChange = { updateCity }
            incremental = "true" /
            >
            <
            button type = "submit" > Search < /button>{" "} <
            /form>{" "} <
            div > { weatherData } < /div>{" "} <
            /div>
        );
    } else {
        return ( <
            form autoComplete = "off"
            onSubmit = { handleSubmit } >
            <
            input id = "formInput"
            autoCapitalize = "words"
            type = "search"
            placeholder = "Type a location to search"
            onChange = { updateCity }
            incremental = "true" /
            >
            <
            button type = "submit" > Search < /button>{" "} <
            /form>
        );
    }
}