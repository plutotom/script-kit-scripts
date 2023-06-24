// Name: notify to close windows
// Schedule: */15 * * * *

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
  .then((temp) => {
    if (temp > 84 || temp < 50)
      return; // Don't send notify if its obvious hot or cold
    else if (temp > 74) {
      // notify(`${temp}°. 🥵 Close your windows! 🪟⬇️🙅`);
      menu(` CLOSE`, []);
    } else if (temp < 58) {
      // notify(`${temp}°. 🥶 COLD! Close your windows!`);
      menu(`CLOSE`, []);
    } else if (temp < 76 && temp > 58) {
      menu(`OPEN`, []);
      // notify(
      // `It is ${temp} degrees outside. 🪟⬆️ You should open your windows!`
      // );
    }
  })
  .catch((error) => {
    // dev(error.message);
    notify("There was an error: " + error.message, (error) => {
      dev(error);
    });
  });
