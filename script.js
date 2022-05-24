// DOM Elements
const input = document.getElementById("input");
const inputForm = document.getElementById("input_form");
const container = document.getElementById("container");
const temperature = document.getElementById("temperature-text");
const icon = document.getElementById("icon");
const locationHeader = document.getElementById("location-text");
const highTemp = document.getElementById("high");
const lowTemp = document.getElementById("low");
const feelsLikeTemp = document.getElementById("feels-like");
const iconDescription = document.getElementById("icon-description");
const humidityText = document.getElementById("humidity");

async function weatherFor(location) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=8cb97e4627dc2c4bc7e9cacc6f2497d5&units=imperial `,
      { mode: "cors" }
    );
    const json = await response.json();
    const data = {
      name: json.name,
      high: json.main.temp_max,
      low: json.main.temp_min,
      temp: json.main.temp,
      feelsLike: json.main.feels_like,
      humidity: json.main.humidity,
      description: json.weather[0].description,
      icon: json.weather[0].icon,
    };
    locationHeader.innerText = data.name;
    temperature.innerText = `${Math.round(data.temp)}°F`;
    icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    highTemp.innerText = `High: ${Math.round(data.high)}°F`;
    lowTemp.innerText = `Low: ${Math.round(data.low)}°F`;
    iconDescription.innerText = `${data.description}`;
    feelsLikeTemp.innerText = `Feels like: ${Math.round(data.feelsLike)}°F`;
    humidityText.innerText = `Humidity: ${data.humidity}%`;
  } catch (err) {
    console.log(err.message);
    locationHeader.innerText = "Location not found";
  }
}

inputForm.addEventListener("submit", (e) => {
  weatherFor(input.value);
  input.value = "";
  e.preventDefault();
});

weatherFor("boston");

// Refactor to use async await
/*
function weatherFor(location) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=8cb97e4627dc2c4bc7e9cacc6f2497d5&units=imperial `,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return {
        name: response.name,
        high: response.main.temp_max,
        low: response.main.temp_min,
        temp: response.main.temp,
        feelsLike: response.main.feels_like,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
      };
    })
    .then((data) => {
      locationHeader.innerText = data.name;
      temperature.innerText = `${Math.round(data.temp)}°F`;
      icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
      highTemp.innerText = `High: ${Math.round(data.high)}°F`;
      lowTemp.innerText = `Low: ${Math.round(data.low)}°F`;
      iconDescription.innerText = `${data.description}`;
      feelsLikeTemp.innerText = `Feels like: ${Math.round(data.feelsLike)}°F`;
      humidityText.innerText = `Humidity: ${data.humidity}%`;
    })
    .catch((err) => {
      console.log(err.message);
      locationHeader.innerText = "Location not found!";
    });
}
*/
