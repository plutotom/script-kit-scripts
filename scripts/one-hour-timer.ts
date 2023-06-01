// Name: one hour timer
// Alias: timer one

import "@johnlindquist/kit";

await browse(
  "https://www.google.com/search?q=1+hour+timer&sourceid=chrome&ie=UTF-8"
);
await wait(3600000); // 1 hour
await widget("1 hour timer");
