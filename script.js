const degree = document.querySelector(".degree");
const getLocation = document.querySelector(".myLocation");
const time = document.querySelector(".time");
const icon = document.querySelector(".dataIcon");
const situation = document.querySelector(".situation");
const precipitation = document.querySelector(".precipitation");
const humidity = document.querySelector(".humidity");
const temperature = document.querySelector(".temperature");
const cloud = document.querySelector(".cloud");
const inputValue = document.querySelector(".input-value");
const btn = document.querySelector(".button");
const apiKey = "9cd9ef8afd014c7f99f223758232912";
let documentBody = document.querySelector("body");
const results = document.querySelector(".results");

async function fetchData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    if (!response.ok) {
      throw new Error("Problem Fetching Data");
    }
    const data = await response.json();
    degree.textContent = data.current.temp_c + "°";
    getLocation.textContent = data.location.name;
    time.textContent = data.current.last_updated;
    icon.src = data.current.condition.icon;
    situation.textContent = data.current.condition.text;
    precipitation.textContent = data.current.precip_mm + "mm";
    humidity.textContent = data.current.humidity;
    temperature.textContent = data.current.temp_c + "°";
    cloud.textContent = data.current.cloud;
  } catch (error) {
    alert(error);
  }
}

btn.addEventListener("click", () => {
  const myLocation = inputValue.value;
  if (myLocation) {
    results.style.display = "flex";
    fetchData(myLocation);
  } else {
    alert("Please input a location to search");
  }
});
