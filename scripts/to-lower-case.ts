// Name: to lower case
// Shortcut: cmd shift l
import "@johnlindquist/kit";

let text = await getSelectedText();
await hide();
await setSelectedText(text.toLocaleLowerCase());
await exit();
