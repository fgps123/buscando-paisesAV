let allCountries = [];

async function searchCountries(value) {
  let reply = await fetch("https://restcountries.com/v3.1/" + value);
  let data = await reply.json();
  allCountries = data;
  renderCountries(allCountries);
}

function renderCountries(allCountries) {
  document.querySelector(".allCountries").innerHTML = "";
  document.querySelector("#qt").innerHTML = allCountries.length;

  for (let country of allCountries) {
    let card = document.createElement("div");
    card.classList.add("country");

    let countryCode = country.cca2.toLowerCase(); 
    card.id = countryCode; 

    card.innerHTML = `
      <a href="detalhes.html?codigo=${countryCode}" class="country-link">
        <img width="200" src="${country.flags.png}" alt="${country.flags.alt}" />
        <span>${country.name.common}</span>
      </a>
    `;
    
    document.querySelector(".allCountries").appendChild(card);
  }
}

function filterCountries(input) {
  searchCountries(input.value);
}

function localSearch(input) {
  const searchedCountries = [];
  const name = input.value.toLowerCase();

  for (let country of allCountries) {
    let c = country.translations.por.common.toLowerCase();
    if (c.startsWith(name)) {
      searchedCountries.push(country);
    }
  }

  renderCountries(searchedCountries);
}

// Não é mais necessário abrirPaginaSecundaria, pois o <a> já faz a navegação corretamente

searchCountries("all");
