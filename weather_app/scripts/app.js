/* eslint-disable no-undef */
const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forcast = new Forcast()

const updateUI = (data) => {
  // local variables (destructuring)
  const { cityDets, weather } = data
  // Update Details Template
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;F</span>
  </div>`

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none')
  }

  icon.setAttribute('src', `img/icons/${weather.WeatherIcon}.svg`)

  if (weather.IsDayTime) {
    time.setAttribute('src', 'img/day.svg')
  } else {
    time.setAttribute('src', 'img/night.svg')
  }
}

cityForm.addEventListener('submit', e => {
  // Prevent default action
  e.preventDefault()
  // get city value from form
  const city = cityForm.city.value.trim()
  cityForm.reset()

  localStorage.setItem('city', city)

  // Update UI with new city
  forcast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
})

if (localStorage.city) {
  forcast.updateCity(localStorage.city.trim())
    .then(data => updateUI(data))
    .catch(err => console.log(err))
}
