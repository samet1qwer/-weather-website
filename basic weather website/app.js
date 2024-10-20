const şhr = document.querySelector("#şehr")
const hava = document.querySelector("#hava")
const sicaklik = document.querySelector("#sicaklik")
const hissedilen = document.querySelector("#hissedilen")
const nem = document.querySelector("#nem")
const rüzgar = document.querySelector("#ruzgar")


const konum=document.getElementById("şehir")
const buton=document.getElementById("get")

const api = "<your api_key>"

const country = "<your country>"

function getCoordinates(apiKey, cityName, countryCode) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                const { lat, lon } = data[0]
                getWeather(apiKey, lat, lon)
            } else {
                console.log("Verilen şehir için veri bulunamadı.")
            }
        })
        .catch((err) => console.log(err))
}

function getWeather(apiKey, lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${apiKey}&lang=tr`)
        .then((response) => response.json())
        .then((weatherData) => {
            displayWeather(weatherData)
            
        })
        .catch((err) => console.log(err))
}

function displayWeather(data) {
    const city = data.name
    const country = data.sys.country
    const description = data.weather[0].description
    const temperature = (data.main.temp - 273.15).toFixed(1)
    const feelsLike = (data.main.feels_like - 273.15).toFixed(1)
    const humidity = data.main.humidity
  
    const windSpeed = data.wind.speed

    
    console.log(description)

    şhr.innerHTML=`Şehir: ${city}, ${country}`
    hava.innerHTML=`Hava Durumu: ${description}`
    sicaklik.innerHTML=`Sıcaklık: ${temperature}°C`
    hissedilen.innerHTML=`Hissedilen Sıcaklık: ${feelsLike}°C`
    nem.innerHTML=`Nem: ${humidity}%`
    rüzgar.innerHTML=`Rüzgar Hızı: ${windSpeed} m/s`
    
 
}
buton.addEventListener("click",()=>{
    const city = konum.value.toUpperCase()    
    getCoordinates(api,city,country)

})



