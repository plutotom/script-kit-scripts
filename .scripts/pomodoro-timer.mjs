// .kenv/kenvs/plutotom/scripts/pomodoro-timer.ts
import "@johnlindquist/kit";
var notifier = await npm("node-notifier");
await notifier.notify("Message");
await notifier.notify({
  title: "My notification",
  message: "Hello, there!"
});
await dev("compleate");
