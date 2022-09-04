'use strict'



const renderCountry = function (data) {
  const html = `<article class="country">
<img class="country__img" src=${data.flag} />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

}


const wherAmI = function (lat, lng) {

  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(response => {
    if (!response.ok)
      throw new Error(`Problem with geocoding ${response.status}`);
    return response.json();
  }).then(data => {
    console.log(data)
    console.log(`You are in ${data.city}, ${data.country}`);
    return fetch(`https://restcountries.com/v2/name/${data.country}`)
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Country Not Found ${response.status}`);
    }
    return response.json();
  }).then(data => {
    console.log(`Country data: ${data[0]}`)
    renderCountry(data[0])}).catch(err => console.error(`${err.message}`))
}

wherAmI(27.139759, 80.867531);
// wherAmI(19.037, 72.873);
// wherAmI(-33.933, 18.474);