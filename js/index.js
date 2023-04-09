

let currentWeather = document.querySelector(".weather");
let case2 = document.querySelector("#case2");
let search = document.querySelector("#search");

async function showWeather(area){

    let apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=68314abed864468a96f00208231602&q=${area}&days=3&aqi=no&alerts=no`);
    if(apiResponse.status == 200)
    {
        let finalResponse = await apiResponse.json();
        console.log(finalResponse);
        currentDay(finalResponse.current , finalResponse.location);
        nextDays(finalResponse.forecast.forecastday);
    }
}

search.addEventListener("input",function(event){

    showWeather(event.target.value);
    
    
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function currentDay(current , location){

    let lastDate = current.last_updated;
    let lastDate1 = ""
    for(let i=0 ; i<lastDate.length ; i++)
    {
        if(lastDate[i] == " ")
        {
            lastDate1 = lastDate.slice(0,i);
            break;
        }
    }
    
    let d = new Date(lastDate1);

    let cartona = `<div class="weather-header d-flex justify-content-between text-center">
    <div class="day">${days[d.getDay()]}</div>
    <div class=" date">${d.getDate() + months[d.getMonth()]}</div>
    </div>
    <div class="weather-content">
        <div class="address">${location.name}</div>
        <div class="degree d-flex justify-content-between align-items-center">
            <div class="degree-number">
                ${current.temp_c}<sup>o</sup>C
            </div>
            <div class="degree-icon ">
                <img src="https:${current.condition.icon}" alt="" width="90">
            </div>
        </div>
        <div class="description">${current.condition.text}</div>
        <span class="me-3"><img src="images/icon-umberella.png" alt="">20%</span>
        <span class="me-3"><img src="images/icon-wind.png" alt="">18km/h</span>
        <span class="me-3"><img src="images/icon-compass.png" alt="">East</span>
    </div>`
    
    currentWeather.innerHTML = cartona;

}

function nextDays(forecastDays){

    let cartona = ``;
    for(let i=1 ; i<forecastDays.length ; i++)
    {
        let background = ""
        if(i==1){
            background = "next-weather"
        }
        else if(i==2)
        {
            background = "next--weather"
        }
        let d = new Date(forecastDays[i].date);
        cartona += `<div class="col-lg-6">
            <div class="h-100 ${background} text-center">
                <div class="weather-header">
                    <div class="day">${days[d.getDay()]}</div>
                </div>
                <div class="weather-content">
                    <div class="degree-icon">
                        <img src="https:${forecastDays[i].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">
                    ${forecastDays[i].day.maxtemp_c}<sup>o</sup>C
                    </div>
                    <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="description">${forecastDays[i].day.condition.text}</div>
                </div>
            </div>
        </div>`

    }

    case2.innerHTML = cartona;

}

showWeather("Cairo");