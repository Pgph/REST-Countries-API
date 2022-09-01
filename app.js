import { renderCountriesList } from "./dom-utils.js";

const API_URL_ALL = "https://restcountries.com/v3.1/all";
let countries;
let query = "";

fetch(API_URL_ALL)
  .then((res) => res.json())
  .then((countriesRaw) => {
    countries = countriesRaw.map((country) => {
      return {
        capital: country.capital && country.capital[0],
        population: country.population,
        name: country.name.common,
        region: country.region,
        flagUrl: country.flags.png,
      };
    });
    renderCountriesList(countries);
  });

document.querySelector("#query").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  countries = countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
  renderCountriesList(countries);

  //render countries based on query
});
