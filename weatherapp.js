const container = document.querySelector('.weather-container');
const Search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404=document.querySelector('.notfound');
const cityhide=document.querySelector('.city-hide');
Search.addEventListener('click', () => {
    const APIKey = '08e0da89408a3b60dc208a61fe0c93a6';
    const city = document.querySelector('.search-box input').value;
    
    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod== '404'){
                cityhide.textContent=city;
                container.style.height='400px';
                weatherbox.classList.remove('active');
                weatherdetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
            container.style.height='555px';
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            if(cityhide.textContent == city)
            {
                return;
            }
            else
            {
                cityhide.textContent= city;
                
                container.style.height='555px';
                container.classList.add('active');
                weatherbox.classList.add('active');
                weatherdetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() =>{},2500);
    
            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                    case 'Cloud':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                    image.src = 'mist.png';
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML= `${json.weather[0].description}`;
            humidity .innerHTML= `${json.main.humidity}%`;
            wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;


            const infoWeather =document.querySelector('.info-weather');
            const infoHumidity =document.querySelector('.info-humidity');
            const infoWind =document.querySelector('.info-wind');

            const elCloneInfoWeather=infoWeather.cloneNode(true);
            const elCloneInfoHumidity=infoHumidity.cloneNode(true);
            const elCloneInfoWind=infoWind.cloneNode(true);
        
            elClondeInfoWeather.id ='clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elClondeInfoHumidity.id ='clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elClondeInfoWind.id ='clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');
              
            setTimeout(() =>
            {
             infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
             infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
             infoWind.insertAdjacentElement("afterend",elCloneInfoWeather);

            },2200);

            const cloneInfoWeather =document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather=cloneInfoWeather.length;
            const cloneInfoWeatherFirst=cloneInfoWeather[0];

            const cloneInfoHumidity =document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst=cloneInfoHumidity[0];

            const cloneInfoWind =document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst=cloneInfoWind[0];
             if(totalCloneInfoWeather >0)
             {
                cloneInfoWeatherFirstFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirstFirst.classList.remove('active-clone');


                setTimeout(() =>{
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();

                },2200)
             }
        }
    })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
