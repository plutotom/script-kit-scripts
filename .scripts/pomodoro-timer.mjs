// .kenv/kenvs/plutotom/scripts/pomodoro-timer.ts
import "@johnlindquist/kit";
var notifier = await npm("node-notifier");
await notifier.notify("Message");
var workTime = await parseInt(await arg("How many minuets?"));
await setTimeout(async () => {
  await notify("Time to take a break!");
  await widget("Time to Brake, you worked for " + workTime + " minuets");
}, workTime * 60 * 1e3);
