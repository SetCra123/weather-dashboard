const API = '6ec5094f4d65c50536ef3931117576bf';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
const container = document.getElementbyId('container');
const btnContainer = document.getElementById('buttons');


function getData(newCity){

    let city = searchInput.value.trim();
    const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API key}';
    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderCurrentWeather(city,state);
        storeSearchHistory(city);
    })
    .catch(function (error) {
      console.error(error);
    });

}


function renderCurrentWeather(city,weather){
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconurl = `http://openweathermap.org/img/wn/${icon}.png`

    
    const tempH1 = document.createElement('h1');
    const windH1 = document.createElement('h1');
    const humidH1 = document.createElement('h1');
    const iconImg = document.createElement('img');

tempH1.textContent = temp;
windH1.textContent = wind;
iconImg.setAtrribute("src", iconurl);
humidH1.textContent = humid;
container.append(iconImg, tempH1, windH1, humidH1);

createHistoryButton()

};
function storeSearchHistory(city) {
    storedCities.push(city);
    localStorage.setItems('cities', JSON.stringify(storedCities));
}

function createHistoryButton() {
    const thisStoredCity = JSON.parse(localStorage.getItem('cities')) || [];
    if(thisStoredCity){
    for (let i = 0; i < thisStoredCity.length; i++) {
        const newButton = document.createElement('button');
        newButton.classList.add('historybtn')
        newButton.textContent = thisStoredCity[i];
        btnContainer.append(newButton);
    }
    
}
    
}
function handleSearchHistory(e) {
        if(!e.target.matches('.historybtn')){
        return;
    }
    const target = e.target;
    const cityName = target.textContent;
    getData(cityName);

}




createHistoryButton();


searchButton.addEventListener('click', getData);
