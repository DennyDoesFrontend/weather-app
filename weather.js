// variables for current location
const currentLocation = document.querySelector('.location');
const currentCountry = document.querySelector('.country');
const currentWeatherStatus = document.querySelector('.weatherStatus')
const temp = document.querySelector('.temp');
const day = document.querySelector('.day');
const time = document.querySelector('.time');
const weatherImage = document.querySelector('.weatherStatusImage');
let myLocation;
let longitude;
let latitude;
var map = L.map('map')

let d = document.querySelector('.day');;
switch (new Date().getDay()) {
    case 0:
        d.textContent = "Sunday".toUpperCase();
      break;
    case 1:
        d.textContent = "Monday".toUpperCase();
      break;
    case 2:
        d.textContent = "Tuesday".toUpperCase();
      break;
    case 3:
        d.textContent = "Wednesday".toUpperCase();
      break;
    case 4:
        d.textContent = "Thursday".toUpperCase();
      break;
    case 5:
        d.textContent = "Friday".toUpperCase();
      break;
    case 6:
      d.textContent= "Saturday".toUpperCase ();
  }

async function getLocation() {
    const apiUrl = 'https://geo.ipify.org/api/v2/country?apiKey=at_DkoFHSyJTi8qWUjSFawBS6bKpXc3W';
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            alert(`there was an error: ${response.status}`)
        }
        const data = await response.json();
        myLocation = data.location.region;
        getWeather();
    }
    catch(error) {
        alert(`ERROR: ${error}`);
    }    
    
}

async function getWeather() {
    const key = '9cd9ef8afd014c7f99f223758232912'
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${myLocation}&aqi=no`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert(`error: ${response}`);
        }

        const data = await response.json();
        currentCountry.textContent = data.location.country; 
        currentLocation.textContent = data.location.region;
        temp.textContent = data.current.temp_c;
        time.textContent = data.location.localtime;
        weatherImage.src = data.current.condition.icon;
        currentWeatherStatus.textContent = data.current.condition.text;
        // map
        
    }
    catch(error) {
        alert(`error fetching data: ${error}`);
    }
    
}

getLocation();


// search bar configuration
const input = document.querySelector('.inputLocation');
const searchBtn = document.querySelector('.searchBtn');
const searchTime = document.querySelector('.searchTime');
const searchCountry = document.querySelector('.searchCountry');
const searchCity = document.querySelector('.searchCity');
const searchTemp = document.querySelector('.searchTemp');
const searchIcon = document.querySelector('.searchIcon');
const condition = document.querySelector('.condition');

// creating function to fetch data once button is clicked
async function searchResult(searchTerm) {
  const key = '9cd9ef8afd014c7f99f223758232912'
  const searchUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${searchTerm}&aqi=no`
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    searchTime.textContent = data.location.localtime;
    searchCountry.textContent = data.location.country; 
    searchCity.textContent = data.location.region;
    searchTemp.textContent = data.current.temp_c + '°C';
    searchIcon.src = data.current.condition.icon;
    condition.textContent = data.current.condition.text;
    //editing the map
    map.setView([data.location.lat, data.location.lon], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  var marker = L.marker([data.location.lat, data.location.lon]).addTo(map);
  }
  catch(error) {
    alert('Error Message: ' + error);
  }

  
}

searchBtn.addEventListener('click', () => {
  searchResult(input.value);
});