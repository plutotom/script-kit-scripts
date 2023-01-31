// Name: pomodoro timer

import "@johnlindquist/kit";

const notifier: typeof import("node-notifier") = await npm("node-notifier");

await notifier.notify("Message");

// Object
await notifier.notify({
  title: "My notification",
  message: "Hello, there!",
});

await dev("compleate");
