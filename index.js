var inp = document.querySelector(".container .main-content .nav .right input");
var btn = document.querySelector(".search");
var city = document.querySelector(".container .main-content .nav .left h1");
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var mahol = document.querySelector(".container .main-content .main .temp span .mahol")
var Temp = document.querySelector(".container .main-content .main .temp h1")
var humidity = document.querySelector(".container .main-content .main .temp span .humid")
var deg = document.querySelector(".container .main-content .main .cloud span .deg")
var humi = document.querySelector(".container .main-content .main .cloud span .humi")
var wind = document.querySelector(".container .main-content .main .cloud span .wind")





function Input() {
    btn.addEventListener("click", function () {
        const cityName = inp.value.trim();
        if (!cityName) return;

        city.innerText = cityName;
        localStorage.setItem("lastCity", cityName);

        wheather(cityName);
        dailyWeather(cityName);
    });

}

const savedCity = localStorage.getItem("lastCity");

if (savedCity) {
    city.innerText = savedCity;
    inp.value = savedCity;

    wheather(savedCity);
    dailyWeather(savedCity);
}

async function wheather(cityName) {
    try {
        const APIkey = "ad5f461d91e5804feccb33dcf83240a7";

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=metric`
        );

        const final = await res.json();

        if (final.cod !== 200) {
            console.log("City not found or invalid input");
            return;
        }

        const temperature = Math.floor(final.main.temp);
        const humid = final.main.humidity;
        const win = Math.round(final.wind.speed);
        const condition = final.weather[0].main;

        if (condition === "Rain" || condition === "Drizzle") {
            mahol.innerText = "Rainy";  

        } 
        else if (condition === "Clouds") {
            mahol.innerText = "Cloudy";
              
        } 
        

        Temp.innerText = `${temperature}°C`;
        humidity.innerText = `${humid}% | ${win} km/h`;
        deg.innerText = `Feels like: ${temperature}°C`;
        humi.innerText = `Humidity: ${humid}%`;
        wind.innerText = `Wind: ${win} km/h`;

    } catch (err) {
        console.log("Error fetching weather");
    }

}


var footer0 = document.querySelector(".container .footer .individual .one");
var footer1 = document.querySelector(".container .footer .individual .two");
var footer2 = document.querySelector(".container .footer .individual .three");
var footer3 = document.querySelector(".container .footer .individual .four");
var footer4 = document.querySelector(".container .footer .individual .five");
var footer5 = document.querySelector(".container .footer .individual .six");




async function dailyWeather(cityName) {
    try {
        const APIkey = "ad5f461d91e5804feccb33dcf83240a7";

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== "200") {
            console.log("City not found or invalid input");
            return;
        }

        const Thursday = (Math.floor(data.list[0].main.temp));
        const Friday = (Math.floor(data.list[1].main.temp));
        const Saturday = (Math.floor(data.list[2].main.temp));
        const Sunday = (Math.floor(data.list[3].main.temp));
        const Monday = (Math.floor(data.list[4].main.temp));
        const Tuesday = (Math.floor(data.list[5].main.temp));

        footer0.innerText = `${Thursday}°C`
        footer1.innerText = `${Friday}°C`
        footer2.innerText = `${Saturday}°C`
        footer3.innerText = `${Sunday}°C`
        footer4.innerText = `${Monday}°C`
        footer5.innerText = `${Tuesday}°C`



    } catch (err) {
        console.log("Error fetching daily weather");
    }

}

var Schedule = document.querySelector(".container .main-content .nav .left h4")
var one = document.getElementById("0");
var two = document.getElementById("1");
var three = document.getElementById("2");
var four = document.getElementById("3");
var five = document.getElementById("4");
var six = document.getElementById("5");

function dateTime() {
    const now = new Date();
    const date = now.getDate();
    const month = now.toLocaleString("default", { month: "short" });
    const year = now.getFullYear();
    const day = now.toLocaleString("default", { weekday: "short" });

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");

    Schedule.innerText = `${day},${date} ${month} |${hours}:${minutes} ${period}`

}

function getDayName(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleString("default", { weekday: "short" });
}

one.innerText   = getDayName(0); 
two.innerText   = getDayName(1); 
three.innerText = getDayName(2);
four.innerText  = getDayName(3);
five.innerText  = getDayName(4);
six.innerText   = getDayName(5);



dateTime();
Input();



