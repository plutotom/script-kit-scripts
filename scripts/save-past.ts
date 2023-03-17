// Name: save past

import "@johnlindquist/kit";

// write an arg that takes in a string that then saves it to the json data base function
await arg("What do you want to save?", async (text) => {
  await db.set("past", text);
});
