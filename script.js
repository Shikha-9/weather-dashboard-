async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "b013507b8db7734604088b3ca1d69758"; // Replace with your OpenWeatherMap API key
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      resultDiv.innerHTML = "❗ Please enter a city name.";
      return;
    }
  
    resultDiv.innerHTML = "Loading...";
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
  
      if (data.cod !== 200) {
        resultDiv.innerHTML = `❌ Error: ${data.message}`;
      } else {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const wind = data.wind.speed;
  
        resultDiv.innerHTML = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>🌡️ Temperature: ${temp}°C</p>
          <p>🌬️ Wind Speed: ${wind} m/s</p>
          <p>🌥️ Weather: ${desc}</p>
        `;
      }
    } catch (error) {
      resultDiv.innerHTML = "⚠️ Failed to fetch data.";
      console.error(error);
    }
  }
  