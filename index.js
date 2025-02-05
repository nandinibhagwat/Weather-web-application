async function getWeather() {
    const location = document.getElementById('location').value;
    const resultDiv = document.getElementById('result');

    if (!location) {
        resultDiv.innerHTML = '<p>Please enter a location!</p>';
         
        return;
    }

    const apiKey = 'e5bec0335c1046fa89265436252601';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;

        resultDiv.innerHTML = `
            <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<p>Unable to fetch weather data. Please try again.</p>';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}