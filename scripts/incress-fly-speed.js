// Name: incress fly speed
// Snippet: 333
import "@johnlindquist/kit";

// on press of the "f" key, type /fs 10
await keyboard.pressKey(Key.Slash);
await wait(100);
await keyboard.type("fs 10");
await keyboard.pressKey(Key.Enter);
