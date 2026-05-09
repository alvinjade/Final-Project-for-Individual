// Mock weather data
const mockWeatherData = {
    current: {
        city: "Manila",
        temp: 28,
        feelsLike: 26,
        humidity: 75,
        wind: 12,
        pressure: 1013,
        desc: "Partly cloudy",
        icon: "fa-cloud-sun",
        date: "Monday, Dec 16"
    },
    hourly: [
        { time: "Now", temp: 28, icon: "fa-cloud-sun" },
        { time: "1PM", temp: 29, icon: "fa-sun" },
        { time: "2PM", temp: 30, icon: "fa-cloud-sun" },
        { time: "3PM", temp: 31, icon: "fa-sun" },
        { time: "4PM", temp: 30, icon: "fa-cloud" },
        { time: "5PM", temp: 29, icon: "fa-cloud-sun-rain" },
        { time: "6PM", temp: 28, icon: "fa-cloud" },
        { time: "7PM", temp: 27, icon: "fa-cloud-moon" },
        { time: "8PM", temp: 26, icon: "fa-moon" }
    ],
    daily: [
        { day: "Tue", temp: 30, high: 32, low: 25, icon: "fa-sun", desc: "Sunny" },
        { day: "Wed", temp: 29, high: 31, low: 24, icon: "fa-cloud-sun-rain", desc: "Scattered showers" },
        { day: "Thu", temp: 28, high: 30, low: 23, icon: "fa-cloud", desc: "Cloudy" },
        { day: "Fri", temp: 31, high: 33, low: 26, icon: "fa-sun", desc: "Sunny" },
        { day: "Sat", temp: 27, high: 29, low: 22, icon: "fa-cloud-sun-rain", desc: "Rain" }
    ]
};

const cities = [
    { name: "Manila", country: "PH", temp: 28, icon: "fa-cloud-sun" },
    { name: "Tokyo", country: "JP", temp: 15, icon: "fa-cloud-sun-rain" },
    { name: "New York", country: "US", temp: 5, icon: "fa-snowflake" },
    { name: "London", country: "UK", temp: 8, icon: "fa-cloud-rain" },
    { name: "Sydney", country: "AU", temp: 25, icon: "fa-sun" }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const suggestions = document.getElementById('suggestions');
const locationBtn = document.getElementById('locationBtn');
const themeToggle = document.getElementById('themeToggle');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadWeatherData(mockWeatherData);
    setupEventListeners();
    updateHeader();
});

// Event Listeners
function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // Location
    locationBtn.addEventListener('click', getCurrentLocation);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Hide suggestions on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) {
            suggestions.classList.remove('show');
        }
    });
}

// Load weather data
function loadWeatherData(data) {
    // Current weather
    document.getElementById('currentCity').textContent = data.current.city + ', PH';
    document.getElementById('currentTemp').textContent = data.current.temp + '°';
    document.getElementById('mainCity').textContent = data.current.city;
    document.getElementById('mainDate').textContent = data.current.date;
    document.getElementById('mainTemp').textContent = data.current.temp + '°';
    document.getElementById('mainIcon').className = data.current.icon;
    document.getElementById('mainDesc').textContent = data.current.desc;
    document.getElementById('feelsLike').textContent = data.current.feelsLike + '°';
    document.getElementById('humidity').textContent = data.current.humidity + '%';
    document.getElementById('windSpeed').textContent = data.current.wind + ' km/h';
    document.getElementById('pressure').textContent = data.current.pressure + ' hPa';

    // Hourly forecast
    renderHourlyForecast(data.hourly);

    // Daily forecast
    renderDailyForecast(data.daily);
}

// Render hourly forecast
function renderHourlyForecast(hourly) {
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';
    
    hourly.forEach(item => {
        const div = document.createElement('div');
        div.className = 'hourly-item';
        div.innerHTML = `
            <i class="fa-solid ${item.icon} hourly-icon"></i>
            <div class="hourly-time">${item.time}</div>
            <div class="hourly-temp">${item.temp}°</div>
        `;
        container.appendChild(div);
    });
}

// Render daily forecast
function renderDailyForecast(daily) {
    const container = document.getElementById('dailyForecast');
    container.innerHTML = '';
    
    daily.forEach(day => {
        const div = document.createElement('div');
        div.className = 'forecast-card';
        div.innerHTML = `
            <i class="fa-solid ${day.icon} forecast-icon"></i>
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-temp">${day.temp}°</div>
            <div class="forecast-details">${day.high}° / ${day.low}° • ${day.desc}</div>
        `;
        container.appendChild(div);
    });
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 1) {
        showSuggestions(query);
    } else {
        suggestions.classList.remove('show');
    }
}

function showSuggestions(query) {
    const filtered = cities.filter(city => 
        city.name.toLowerCase().includes(query) || 
        city.country.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
        renderSuggestions(filtered);
        suggestions.classList.add('show');
    } else {
        suggestions.classList.remove('show');
    }
}

function renderSuggestions(cities) {
    suggestions.innerHTML = '';
    cities.slice(0, 5).forEach(city => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <i class="fa-solid ${city.icon} suggestion-icon"></i>
            <div class="suggestion-info">
                <h4>${city.name}</h4>
                <p>${city.country} • ${city.temp}°C</p>
            </div>
        `;
        div.addEventListener('click', () => selectCity(city));
        suggestions.appendChild(div);
    });
}

function selectCity(city) {
    // Mock city selection
    const mockData = {
        current: {
            city: city.name,
            temp: city.temp,
            feelsLike: city.temp - 2,
            humidity: 70,
            wind: 10,
            pressure: 1012,
            desc: "Clear sky",
            icon: city.icon,
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        },
        hourly: mockWeatherData.hourly,
        daily: mockWeatherData.daily
    };
    
    loadWeatherData(mockData);
    updateHeader(city.name, city.temp);
    searchInput.value = '';
    suggestions.classList.remove('show');
}

function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        const city = cities.find(c => c.name.toLowerCase() === query.toLowerCase());
        if (city) {
            selectCity(city);
        } else {
            alert('City not found! Try Manila, Tokyo, etc.');
        }
    }
}

// Update header
function updateHeader(city = 'Manila, PH', temp = 28) {
    document.getElementById('currentCity').textContent = city;
    document.getElementById('currentTemp').textContent = temp + '°';
}

// Current location (mock)
function getCurrentLocation() {
    // Mock geolocation
    const mockCities = ['Manila, PH', 'Quezon City, PH', 'Makati, PH'];
    const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
    const temp = Math.floor(Math.random() * 10) + 25;
    
    updateHeader(randomCity, temp);
    
    // Update main weather
    const mockData = {
        current: {
            city: randomCity.split(',')[0],
            temp: temp,
            feelsLike: temp - 2,
            humidity: Math.floor(Math.random() * 30) + 60,
            wind: Math.floor(Math.random() * 10) + 5,
            pressure: 1000 + Math.floor(Math.random() * 20),
            desc: "Sunny",
            icon: "fa-sun",
            date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        },
        hourly: mockWeatherData.hourly,
        daily: mockWeatherData.daily
    };
    
    loadWeatherData(mockData);
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
    localStorage.setItem('weatherTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Load saved theme
if (localStorage.getItem('weatherTheme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.querySelector('i').className = 'fa-solid fa-sun';
}

// Loader
window.addEventListener('load', () => {
    document.querySelector('.loader').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
    }, 500);
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards
document.querySelectorAll('.weather-card, .forecast-card, .hourly-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});