// Name: decress fly speed
// Snippet: 222
import "@johnlindquist/kit";

// on press of the "f" key, type /fs 10
await keyboard.pressKey(Key.Slash);
await wait(100);
await keyboard.type("fs 2");
await keyboard.pressKey(Key.Enter);
