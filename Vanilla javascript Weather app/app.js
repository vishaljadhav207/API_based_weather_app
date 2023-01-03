

const weatherapi = {
    key: "365f7c0cf7e10fcc70712f2f5be7a156",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchinputbox = document.getElementById('input-box');

//event listenar function on keypress
searchinputbox.addEventListener('keypress', (Event) => {
    if (Event.keyCode == 13) {
        console.log(searchinputbox.value);
        getweatherreport(searchinputbox.value);
        document.querySelector('.weather-body').style.display="block";//when nothing enter in input or invalid city then print block
    }
});
//get weather reports
function getweatherreport(city) {
    fetch(`${weatherapi.baseurl}?q=${city}&appid=${weatherapi.key}&units=metric`)//&unit=metric used for converting temp to celcius
        .then(weather => {
            return weather.json();
        }).then(showweatherreport);
}

//show weather report
function showweatherreport(weather) {
    console.log(weather);

    //to change city name
    let city = document.getElementById('city')
    city.innerText = `${weather.name},${weather.sys.country}`;

    //to show temp 
    let temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; //Math.round(weather.main.temp) for givng integer temperature

    // to show min and max temperature
    let minmaxtemp = document.getElementById("min-max");
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    //to show weather type
    let weathertype = document.getElementById("weather");
    weathertype.innerHTML = `${weather.weather[0].main}`;

    //manage date 
    let date = document.getElementById("date");
    let todatdate = new Date();
    date.innerHTML = dateManage(todatdate);

    if (weathertype.textContent == "Clear") {
        document.body.style.backgroundImage = "url('images/clear1.jpg')";
    }else if (weathertype.textContent == "Clouds") {
        document.body.style.backgroundImage = "url('images/cloud1.jpg')";
    }else if (weathertype.textContent == "Thunderstorm") {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }else if (weathertype.textContent == "Sunny") {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }else if (weathertype.textContent == "Rain") {
        document.body.style.backgroundImage = "url('images/rain1.jpg')";
    }else if (weathertype.textContent == "Haze") {
        document.body.style.backgroundImage = "url('images/bg.jpg')";
    }else if (weathertype.textContent == "Snow") {
        document.body.style.backgroundImage = "url('images/snow1.jpg')";
    }
}
//manage date
function dateManage(dateargument) {
    let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "Jully", "August", "September"
        , "October", "November", "December"];
    let year = dateargument.getFullYear();
    let month = months[dateargument.getMonth()];
    let date = dateargument.getDate();
    let day = days[dateargument.getDay()];
    return `${date} ${month} (${day}),${year}`;
}


