const mockData = {
    'London': { temp: '12°', condition: 'Mostly Cloudy', humidity: '64%', wind: '18 km/h', uv: '4 Low', pressure: '1012 hPa' },
    'New York': { temp: '8°', condition: 'Clear Sky', humidity: '45%', wind: '22 km/h', uv: '2 Low', pressure: '1015 hPa' },
    'Tokyo': { temp: '15°', condition: 'Partly Cloudy', humidity: '55%', wind: '10 km/h', uv: '5 Moderate', pressure: '1008 hPa' },
    'Paris': { temp: '11°', condition: 'Rainy', humidity: '80%', wind: '15 km/h', uv: '1 Low', pressure: '1005 hPa' },
    'India': { temp: '28°', condition: 'Haze', humidity: '40%', wind: '5 km/h', uv: '8 Very High', pressure: '1009 hPa' },
    'Brazil': { temp: '26°', condition: 'Humid', humidity: '75%', wind: '12 km/h', uv: '10 Very High', pressure: '1011 hPa' },
    'Italy': { temp: '18°', condition: 'Sunny', humidity: '50%', wind: '8 km/h', uv: '6 High', pressure: '1013 hPa' },
    'Australia': { temp: '24°', condition: 'Sunny', humidity: '40%', wind: '12 km/h', uv: '9 High', pressure: '1010 hPa' },
    'Canada': { temp: '2°', condition: 'Snowing', humidity: '85%', wind: '25 km/h', uv: '1 Low', pressure: '1002 hPa' },
    'Germany': { temp: '7°', condition: 'Foggy', humidity: '90%', wind: '10 km/h', uv: '2 Low', pressure: '1018 hPa' },
    'South Africa': { temp: '21°', condition: 'Windy', humidity: '45%', wind: '30 km/h', uv: '7 High', pressure: '1012 hPa' },
    'China': { temp: '14°', condition: 'Overcast', humidity: '60%', wind: '15 km/h', uv: '3 Low', pressure: '1014 hPa' }
};

const citySearch = document.getElementById('citySearch');
const cityNameEl = document.getElementById('cityName');
const currentTempEl = document.getElementById('currentTemp');
const conditionEl = document.querySelector('.condition');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const uvIndexEl = document.getElementById('uvIndex');
const pressureEl = document.getElementById('pressure');
const cityCards = document.querySelectorAll('.city-card');

function updateWeather(city) {
    const data = mockData[city];
    if (data) {
        cityNameEl.textContent = city;
        currentTempEl.textContent = data.temp;
        conditionEl.textContent = data.condition;
        humidityEl.textContent = data.humidity;
        windSpeedEl.textContent = data.wind;
        uvIndexEl.textContent = data.uv;
        pressureEl.textContent = data.pressure;

        // Update active state in explorer grid
        const cityGridCards = document.querySelectorAll('.city-card-premium');
        cityGridCards.forEach(card => {
            card.style.borderColor = 'var(--glass-border)';
            card.style.boxShadow = 'none';
            if (card.querySelector('h4').textContent === city ||
                (city === 'London' && card.querySelector('h4').textContent === 'UK') ||
                (city === 'New York' && card.querySelector('h4').textContent === 'USA')) {
                card.style.borderColor = 'var(--accent)';
                card.style.boxShadow = '0 0 15px var(--accent)';
            }
        });
    }
}

citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = citySearch.value;
        if (mockData[city]) {
            updateWeather(city);
            citySearch.value = '';
        } else {
            alert('City not found in mock data! Try London, Tokyo, Paris, etc.');
        }
    }
});

cityCards.forEach(card => {
    card.addEventListener('click', () => {
        const city = card.querySelector('h4').textContent;
        updateWeather(city);
    });
});

// Set current date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options);
