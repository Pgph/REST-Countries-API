const createInfoElement = (labelName, value) => {
  const infoElement = document.createElement("div");

  const labelElement = document.createElement("strong");
  labelElement.innerText = `${labelName}: `;
  const valueElement = document.createElement("span");
  valueElement.textContent = value;

  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);

  return infoElement;
};

const createFlageImgElement = (country) => {
  const imgContainerElement = document.createElement("div");
  const imgElement = document.createElement("img");
  imgElement.src = country.flagUrl;
  imgElement.alt = `${country.name} flag`;

  imgContainerElement.appendChild(imgElement);
  return imgContainerElement;
};

const createCountryItemElement = (country) => {
  const countryElement = document.createElement("li");

  const anchorElement = document.createElement("a");
  anchorElement.href = `?country=${country.code}`;

  anchorElement.appendChild(createFlageImgElement(country));

  const infoContainerElement = document.createElement("div");
  infoContainerElement.classList.add("info-container");

  const countryNameElement = document.createElement("strong");
  countryNameElement.innerText = country.name;
  countryNameElement.classList.add("country-name");

  infoContainerElement.appendChild(countryNameElement);

  infoContainerElement.appendChild(
    createInfoElement("Population", country.population)
  );

  infoContainerElement.appendChild(createInfoElement("Region", country.region));

  infoContainerElement.appendChild(
    createInfoElement("Capital", country.capital)
  );
  anchorElement.appendChild(infoContainerElement);
  countryElement.appendChild(anchorElement);

  return countryElement;
};

const createListElement = (countries) => {
  const listElement = document.createElement("ul");
  countries.forEach((country) =>
    listElement.appendChild(createCountryItemElement(country))
  );
  return listElement;
};

const createDetailElement = (country) => {
  const detailContainerElement = document.createElement("div");

  const flagImgElement = createFlageImgElement(country);
  const detailContentElement = document.createElement("div");
  detailContainerElement.classList.add("detail-container");
  detailContentElement.classList.add("detail-content");

  const detailNameElement = document.createElement("strong");
  detailNameElement.innerText = country.name;
  detailNameElement.classList.add("detail-name");

  detailContainerElement.appendChild(flagImgElement);
  detailContentElement.appendChild(detailNameElement);

  const leftColumnElement = document.createElement("div");

  leftColumnElement.appendChild(
    createInfoElement("Native name", country.nativeName)
  );
  leftColumnElement.appendChild(
    createInfoElement("Population", country.population)
  );
  leftColumnElement.appendChild(createInfoElement("Region", country.region));

  leftColumnElement.appendChild(
    createInfoElement("Sub region", country.subregion)
  );
  leftColumnElement.appendChild(createInfoElement("Capital", country.capital));

  const rightColumnElement = document.createElement("div");

  rightColumnElement.appendChild(
    createInfoElement("Top level domain", country.tld)
  );
  rightColumnElement.appendChild(
    createInfoElement("Currencies", country.currencies)
  );
  rightColumnElement.appendChild(
    createInfoElement("language", country.languages)
  );

  detailContentElement.appendChild(leftColumnElement);
  detailContentElement.appendChild(rightColumnElement);

  if (country.borders && country.borders.length > 0) {
    detailContentElement.appendChild(createBorderCountriesContainer(country));
  }
  detailContainerElement.appendChild(detailContentElement);

  return detailContainerElement;
};

const createDetailButton = (text, link) => {
  const anchorElement = document.createElement("a");
  anchorElement.innerText = text;
  anchorElement.classList.add("detail-button");
  anchorElement.href = link;

  return anchorElement;
};

const createBorderCountriesContainer = (country) => {
  const borderCountriesContainerElement = document.createElement("div");
  borderCountriesContainerElement.classList.add("border-countries-container");
  const labelElement = document.createElement("strong");
  labelElement.innerText = "Border Countries";

  borderCountriesContainerElement.appendChild(labelElement);

  country.borders.forEach((border) => {
    borderCountriesContainerElement.appendChild(
      createDetailButton(border, `/?country=${border}`)
    );
  });

  return borderCountriesContainerElement;
};

export const renderCountriesList = (countries) => {
  const rootElement = document.querySelector("#root");
  rootElement.innerHTML = "";
  rootElement.appendChild(createListElement(countries));
};

export const renderCountryDetails = (country) => {
  const rootElement = document.querySelector("#root");
  rootElement.innerHTML = "";
  rootElement.appendChild(createDetailButton("Go back", "/"));
  rootElement.appendChild(createDetailElement(country));
};

const headerContent = document.querySelector(".header-content");
const header = document.querySelector("header");
const body = document.querySelector("body");
const main = document.querySelector("main");
const btn = document.createElement("button");

btn.classList.add("toggleButton");
btn.innerText = "Light Theme";
headerContent.appendChild(btn);

let theme = localStorage.getItem("theme") || "light";
console.log(theme);

btn.addEventListener("click", () => {
  if (theme === "dark") {
    theme = "light";
    btn.innerText = "Light Theme";
    btn.classList.remove("dark");
    body.classList.remove("dark");
    header.classList.remove("dark");
    main.classList.remove("dark");
  } else {
    theme = "dark";
    btn.innerText = "Dark Theme";
    btn.classList.add("dark");
    body.classList.add("dark");
    header.classList.add("dark");
    main.classList.add("dark");
  }
  localStorage.setItem("theme", theme);
});

if (theme === "dark") {
  btn.innerText = "Dark Theme";
  btn.classList.add("dark");
  body.classList.add("dark");
  header.classList.add("dark");
  main.classList.add("dark");
}
