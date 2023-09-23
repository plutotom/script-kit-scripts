// Name: get weather

import "@johnlindquist/kit";

import { AsyncWeather } from "@cicciosgamino/openweather-apis";
const weatherInstance = await new AsyncWeather();

const cityZipCode = await env("CITY_ZIP_CODE", "Enter your city zip code");
const openWeatherAPIKey = await env(
  `OPEN_WEATHER_KEY`,
  "Enter your open weather api key"
);

await weatherInstance.setApiKey(openWeatherAPIKey);
await weatherInstance.setLang("en");
await weatherInstance.setZipCodeAndCountryCode(cityZipCode, "US");
await weatherInstance.setUnits("imperial");

await weatherInstance
  .getTemperature()
  .then(async (temp) => {
    // notify(`${temp}°`);

    notify({
      title: "Weather",
      message: temp + ` - Zip: ${cityZipCode}`,
      wait: false,
    });
  })
  .catch((error) => {
    notify(
      { title: "Error", message: error.message, wait: true },
      async (error) => {
        await dev(error);
      }
    );
  });
