// Name: Timer
// Alias: timer one

import "@johnlindquist/kit";

let duration = await arg("Pick a duration in minutes", [
  "10",
  "20",
  "30",
  "45",
  "60",
]);

await browse(
  `https://www.google.com/search?q=${duration}+minute+timer&sourceid=chrome&ie=UTF-8`
);

//convert minute to millisecond
let seconds = Number(duration) * 60;
let millisecond = seconds * 1000;

await wait(millisecond);
await widget(`Times Up! You focused for ${duration} Minutes`);
