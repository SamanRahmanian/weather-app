import React, { useState } from "react";
import axios from "axios";

const Template = () => {
  const [api, setApi] = useState({
    base: "https://api.openweathermap.org/data/2.5/",
    apiKey: "b1920b6e98c50ba2929fafd0bfdac008",
  });
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const dateBuilder = () => {
    const d = new Date();
    // month names array
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // day names array
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = (event) => {
    if (event.key === "Enter" && document.querySelector(".search-bar")) {
      axios
        .get(`${api.base}weather?q=${query}&appid=${api.apiKey}`)
        .then((response) => setWeather(response.data))
      document.querySelector(".search-bar").blur()
    }
  };

  return (
    <div
      id="container"
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp - 274 > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(Number(weather.main.temp) - 274)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Template;
