import React, { useState } from "react";

let SearchWeather = () => {
    let [weather,setWeather] = useState(null);
    let [change,setChange] = useState("");

    let api={
        key:"c292dca44f3817894eef8d2e999ac309",
        url:"https://api.openweathermap.org/data/2.5/weather"
    }

    function getWeather(){
        fetch(`${api.url}?q=${change}&appid=${api.key}&units=metric`)
        .then(res=>res.json())
        .then(data=>{
            if (data.cod === "404") {
                    setError("❌ City not found. Please try again.");
                } else {
                    setWeather(data);
                }
        });
    }
    function getWeatherImage(condition) {
        if (!condition) return null;
        condition = condition.toLowerCase();
        if (condition.includes("rain")) return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        if (condition.includes("cloud")) return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        if (condition.includes("clear")) return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        if (condition.includes("snow")) return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
        return "https://cdn-icons-png.flaticon.com/512/4150/4150897.png";
    }
    return(
        <div className="weather-container">
            <h1>🌤️ Weather Finder</h1>
            <input type="text" placeholder="Enter city name..." onChange={e => setChange(e.target.value)}/>
            <button onClick={getWeather}>Search Weather</button>
                {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <h3>{weather.main.temp}<sup>o</sup>C</h3>
                     <img
                        src={getWeatherImage(weather.weather[0].main)}
                        alt={weather.weather[0].main}
                    />
                </div>
            )}
        </div>
    )
}
export default SearchWeather;