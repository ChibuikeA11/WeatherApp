// assigning variables to various elements from the html
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

//assigning an event listener for when the user clicks the search button
search.addEventListener('click', () => {

    const APIKey = 'fcfd2a214f8046b547c8f5b4fc147b5a';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
//if the city input is not empty, it would make a GET request 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) //the response received from the api is converted in json
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'src/clear.png';
                    break;

                case 'Rain':
                    image.src = 'src/rain.png';
                    break;

                case 'Snow':
                    image.src = 'src/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'src/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'src/mist.png';
                    break;

                default:
                    image.src = '';
            }
//Extracting the weather conditions and assigning them to the HTML elements
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

//to trigger the css fadeIn animation
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });
});