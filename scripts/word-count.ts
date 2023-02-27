// Name: word count
// Shortcut: cmd+shift+1
import "@johnlindquist/kit";

// get clipboard content
const text = await clipboard.readText();
// count number of words in clipboard content
const wordCount = await text.split(" ").length;

let w = await widget(`<h1 style="color: black;">${wordCount.toString()}</h1>`, {
  //   x: 0,
  //   y: 0,
  width: 300,
  height: 75,

  //   onClick: async () => {
  //     //close the window
  //     await close();
  //   },
});

await w.onClick(async () => {
  await w.close();
});

setTimeout(async () => {
  await w.close();
}, 3000);

await notify(wordCount.toString());
