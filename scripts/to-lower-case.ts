// Name: to lower case

import "@johnlindquist/kit";

// await dev(getSelectedText());
let text = await getSelectedText();

// get selected text, convert to lower case, and replace selection
// let text = await arg("Enter text to lowercase");
// await clipboard.writeText(text.toLowerCase());
setSelectedText(text.toLocaleLowerCase());
