# javascript-weather-app
🌤 Weather Application

A simple weather application that allows users to search for a city’s weather and display the temperature, humidity, wind speed, and weather condition.

📌 Features
    •    🌍 Search weather by city name.
    •    🌡️ Display current temperature, “feels like” temperature, humidity, and wind speed.
    •    🌦️ Show weather conditions with icons.
    •    🎨 Styled using SCSS for a modern and responsive design.
    •    ⚡ Built using JavaScript (Fetch API) to get real-time weather data.
    
    🛠️ Technologies Used
    •    HTML → Structure of the webpage.
    •    SCSS (CSS Preprocessor) → Styling the UI.
    •    JavaScript (ES6+ Fetch API) → Fetching weather data from an external API.
    •    OpenWeatherMap API → To get real-time weather data.
    
🚀 Installation & Setup
1.    Clone this repository:
    
git clone https://github.com/your-username/javascript-weather-app.git
cd javascript-weather-app

2.    Install dependencies (if required, e.g., SCSS compiler):

npm install

3.    Start a local development server (optional):

live-server

Or simply open index.html in your browser.

🌍 How It Works
    1.    Enter a city name (e.g., “Sydney”) in the input field.
    2.    Click the “Get Weather” button.
    3.    The app fetches weather data from the OpenWeatherMap API and displays:
    •    Temperature (°C)
    •    Weather Condition (e.g., “Light Rain”)
    •    Feels like Temperature
    •    Humidity
    •    Wind Speed
    4.    The app also displays a relevant weather icon.
    
🔑 API Used

This app uses the OpenWeatherMap API to fetch real-time weather data.

To use this app, you’ll need an API key:
    1.    Sign up at OpenWeatherMap.
    2.    Get a free API key.
    3.    Replace the API key in your JavaScript file:
    const API_KEY = "your_api_key_here";
    4.    Done! The app should now fetch weather data.
    
🖼️ Screenshots

Here’s what the app looks like in action:

📜 License

This project is MIT licensed – feel free to use and modify it!
