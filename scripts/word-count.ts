// Name: word count
// Shortcut: cmd+shift+1
import "@johnlindquist/kit";

// get clipboard content
const text = await clipboard.readText();
// count number of words in clipboard content
const wordCount: number = await text.split(" ").length;

// Three-hundred words = one dubbed-spaced page
let pageCount: number = wordCount / 300;
//round to the nearest two decimal places
pageCount = parseFloat(pageCount.toFixed(2));

let w = await widget(
  `
    <div>
  <h1 style="color: black;">Word Count: ${wordCount}</h1> 
  <h3 style="color: black;">Page Count: ${pageCount}</h3>
  </div>`,
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
