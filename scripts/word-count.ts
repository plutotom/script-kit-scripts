// Name: word count

import "@johnlindquist/kit";

// get clipboard content
const text = await clipboard.readText();
// count number of words in clipboard content
const wordCount = await text.split(" ").length;

await notify(wordCount.toString());
