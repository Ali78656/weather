const weatherE = document.querySelector(".weather");
const cityE = document.querySelector(".input");
const cardE = document.querySelector(".card");
const apikey = "297179b5f3bf56149ba203892ebab85f";
const btnE = document.querySelector(".btn");

async function display(event) {
  event.preventDefault();
  const city = cityE.value;

  if (city) {
    try {
      const getData = await getweatherData(city);
      displayweatherInfo(getData);
    } catch (error) {
      console.error(error);
      displayerror(error);
    }
  } else {
    displayerror("Please entre a city");
  }
}

async function getweatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  return await response.json();
}

const displayweatherInfo = (data) => {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  // Convert temperature from Kelvin to Celsius
  const tempCelsius = (temp - 273.15).toFixed(0);

  cardE.textContent = "";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${tempCelsius}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `Weather: ${description}`;

  cityDisplay.classList.add("city");
  tempDisplay.classList.add("temp");
  humidityDisplay.classList.add("humidity");
  descDisplay.classList.add("desc");

  cardE.appendChild(cityDisplay);
  cardE.appendChild(tempDisplay);
  cardE.appendChild(humidityDisplay);
  cardE.appendChild(descDisplay);
};

const displayerror = (message) => {
  const errordisplay = document.createElement("p");
  errordisplay.textContent = message;
  errordisplay.classList.add("error");

  cardE.textContent = "";
  cardE.style.display = "flex";
  cardE.appendChild(errordisplay);
};

btnE.addEventListener("click", display);
