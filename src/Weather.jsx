import React, { useState } from "react";
import "./App.css";
import "./index.css"; // Contains your pulse animation
import axios from "axios";
import 'weather-icons/css/weather-icons.css';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCity(evt) {
    setCity(evt.target.value);
  }

  function getIconClass(condition) {
    const lower = condition.toLowerCase();

    if (lower.includes("clear")) return "wi wi-day-sunny";
    if (lower.includes("cloud")) return "wi wi-cloudy";
    if (lower.includes("rain")) return "wi wi-rain";
    if (lower.includes("snow")) return "wi wi-snow";
    if (lower.includes("storm") || lower.includes("thunder")) return "wi wi-thunderstorm";
    if (lower.includes("mist") || lower.includes("fog")) return "wi wi-fog";
    if (lower.includes("drizzle")) return "wi wi-sprinkle";
    return "wi wi-na";
  }

  function getWeather() {
    if (!city) return;

    setLoading(true);
    setError("");

    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5065015d533c1d5935fe826277a76ec0&units=metric`
    )
      .then((res) => {
        const data = res.data;
        setWeather(data.weather[0].main);
        setDesc(data.weather[0].description);
        setTemperature(data.main.feels_like);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setWeather("");
        setDesc("");
        setTemperature("");
        setError("City not found or API error.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const iconClass = getIconClass(weather);

  return (
    <div className="bg-black p-20 min-h-screen text-white">
      <div className="bg-green-400 p-10 rounded-md max-w-md mx-auto text-black">
        <h1 className="text-2xl font-medium">Weather Report</h1>
        <p className="text-sm">Enter your city below:</p>

        <input
          onChange={handleCity}
          value={city}
          type="text"
          className="mt-2 border border-black rounded bg-white p-1 w-full"
          placeholder="Enter your city name"
        />

        <button
          onClick={getWeather}
          className="bg-black text-white p-2 rounded-md mt-3"
        >
          Get Report
        </button>

        {loading && <p className="text-center mt-4 text-blue-600">Loading...</p>}
        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

        {weather && (
          <div className="mt-6 text-center">
            <i className={`${iconClass} wi-animate-pulse text-6xl`}></i>
            <h2 className="mt-4"><b>Weather:</b> {weather}</h2>
            <p><b>Temperature:</b> {temperature}°C</p>
            <p><b>Description:</b> {desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
