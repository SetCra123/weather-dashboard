const API_KEY = '6ec5094f4d65c50536ef3931117576bf';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
const container = document.getElementById('container');
const btnContainer = document.getElementById('buttons');

console.log(container);

function getData(city) {
    if (!city) {
        city = searchInput.value.trim();
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            renderCurrentWeather(city, data);
            storeSearchHistory(city);
        })
        .catch(error => {
            console.error(error);
        });
}

function renderCurrentWeather(city, weather) {
    container.innerHTML = '';
    const cityName = weather.city.name;
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${icon}.png`;

    const tempH1 = document.createElement('h1');
    const windH1 = document.createElement('h1');
    const humidH1 = document.createElement('h1');
    const iconImg = document.createElement('img');

    tempH1.textContent = `Temperature: ${temp}°K`;
    windH1.textContent = `Wind: ${wind} m/s`;
    humidH1.textContent = `Humidity: ${humid}%`;
    iconImg.setAttribute('src', iconurl);

    container.append(iconImg, tempH1, windH1, humidH1);

    createHistoryButton();
}

function storeSearchHistory(city) {
    if (!storedCities.includes(city)) {
        storedCities.push(city);
        localStorage.setItem('cities', JSON.stringify(storedCities));
    }
}

function createHistoryButton() {
    btnContainer.innerHTML = '';
    const thisStoredCity = JSON.parse(localStorage.getItem('cities')) || [];
    thisStoredCity.forEach(city => {
        const newButton = document.createElement('button');
        newButton.classList.add('historybtn');
        newButton.textContent = city;
        btnContainer.append(newButton);
    });
}

function handleSearchHistory(e) {
    if (!e.target.matches('.historybtn')) {
        return;
    }
    const target = e.target;
    const cityName = target.textContent;
    getData(cityName);
}

createHistoryButton();
btnContainer.addEventListener('click', handleSearchHistory);
searchButton.addEventListener('click', () => getData());
