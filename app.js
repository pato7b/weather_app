window.addEventListener("load", () => {
  const apiKey = "d74f632c8b2a2607e1e911e1280f72ab"
  let long
  let lat
  let temperatureDescription = document.querySelector(".temperature-description")
  let temperatureDegree = document.querySelector(".temperature-degree")
  let locationTimezone = document.querySelector(".location-timezone")
  let icon = document.querySelector(".icon")
  let degreeSection = document.querySelector(".degree-section")
  let temperatureSpan = document.querySelector(".temperature-span")
  let speedWind = document.querySelector(".speed")
  let speedSection = document.querySelector(".speed-section")
  let speedSpan = document.querySelector(".speed-span")



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude


      const proxi = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxi}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`

      fetch(api)

        .then(response => response.json())
        .then(data => {
          console.log(data)

          const temp = data.main.temp
          const location = data.name
          const description = data.weather[0].description
          const speed = data.wind.speed

          temperatureDegree.textContent = temp
          locationTimezone.textContent = location
          temperatureDescription.textContent = description
          speedWind.textContent = speed
          let fahrenheit = temp * 9 / 5 + 32
          let miles = speed * 0.62137

          icon.innerHTML = `<img class= "icon-size" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`

          degreeSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C"
              temperatureDegree.textContent = temp
            } else {
              temperatureSpan.textContent = "F"
              temperatureDegree.textContent = Math.floor(fahrenheit)
            }
          })

          speedSection.addEventListener("click", () => {
            if (speedSpan.textContent === "km") {
              speedSpan.textContent = "mile"
              speedWind.textContent = Math.round(miles * 100) / 100
            } else {
              speedSpan.textContent = "km"
              speedWind.textContent = speed
            }

          })
        })
    })
  }
})