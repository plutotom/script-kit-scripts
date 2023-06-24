// Name: count sentences
// shortcut: cmd + shift + 3
// todo - make it not count the period that maybe in-text citations
// i.e (Smith, 2020, p. 1). - should only count the period after the citation.
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
