const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const background = document.querySelector(".background");

const apiKey = "7c503ce51d8b234ce7deb4beaf355f3f";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch {
      displayError("Could not fetch weather data");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Could not fetch weather data");
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `🌡️ ${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `💧 Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  emojiDisplay.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  emojiDisplay.classList.add("weatherEmoji");

  card.append(cityDisplay, tempDisplay, humidityDisplay, descDisplay, emojiDisplay);

  // Change background color based on weather
  changeBackground(id);
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800) return "☁️";
  return "🌍";
}

function changeBackground(weatherId) {
  if (weatherId >= 200 && weatherId < 300)
    background.style.background = "linear-gradient(120deg, #2c3e50, #bdc3c7)";
  else if (weatherId >= 500 && weatherId < 600)
    background.style.background = "linear-gradient(120deg, #4b79a1, #283e51)";
  else if (weatherId >= 600 && weatherId < 700)
    background.style.background = "linear-gradient(120deg, #83a4d4, #b6fbff)";
  else if (weatherId === 800)
    background.style.background = "linear-gradient(120deg, #e8fc08ff, #fbfcfdff)";
  else if (weatherId > 800)
    background.style.background = "linear-gradient(120deg, #757f9a, #d7dde8)";
  else
    background.style.background = "linear-gradient(120deg, #a1c4fd, #c2e9fb)";
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.appendChild(errorDisplay);
}

