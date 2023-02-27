// Name: word count
// Shortcut: cmd+shift+1
import "@johnlindquist/kit";

// get clipboard content
const text = await clipboard.readText();
// count number of words in clipboard content
const wordCount = await text.split(" ").length;

let w = await widget(`<h1 style="color: black;">${wordCount.toString()}</h1>`, {
  width: 300,
  height: 75,
});

// If the widget is clicked, close it
await w.onClick(async () => {
  await w.close();
});

// After 3 seconds, close the widget
setTimeout(async () => {
  await w.close();
}, 3000);
