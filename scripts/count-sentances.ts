// Name: count sentences
// shortcut: cmd + shift + p
import "@johnlindquist/kit";

const myText: string = await clipboard.readText();
const stop: RegExp = /[.!?]/;
const sentence: Array<string> = myText.split(stop);
const sentenceLength: number = sentence.length - 1;
let w = await widget(
  `
      <div>
    <h1 style="color: black;">Word Count: ${sentenceLength}</h1> 
    
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

await hide();
