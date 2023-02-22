// Name: pomodoro timer

import "@johnlindquist/kit";

// const notifier: typeof import("node-notifier") = await npm("node-notifier");
// todo - add a widget to show the timer
// todo - add time in notification

// const nc = new notifier.NotificationCenter();

// ask user for how much time they want to work
let workTime: Number = await parseInt(await arg("How many minuets?"));

await setTimeout(async () => {
  await notify("Time to take a break!");
  await widget("Time to Brake, you worked for " + workTime + " minuets");
}, workTime * 60 * 1000);

await hide();
