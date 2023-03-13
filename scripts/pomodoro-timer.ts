// Name: pomodoro timer

import "@johnlindquist/kit";

// const notifier: typeof import("node-notifier") = await npm("node-notifier");
// todo - add a widget to show the timer
// todo - add time in notification

// const nc = new notifier.NotificationCenter();

// ask user for how much time they want to work
let workTime: number = await parseInt(await arg("How many minuets?"));

await setTimeout(async () => {
  var w = await widget(
    `<h1 style="color: black;">You worked for: ${workTime.toString()}</h1>
    <br/> 
    <p>Time to take a break!</p>
    `,
    {
      width: 300,
      height: 75,
    }
  );

  // If the widget is clicked, close it
  await w.onClick(async () => {
    await w.close();
    await exit();
  });

  // After 3 seconds, close the widget
  setTimeout(async () => {
    await w.close();
    await exit();
  }, 3000);
}, workTime * 60 * 1000);

await hide();
