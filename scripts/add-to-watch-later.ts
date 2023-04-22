// Name: add to watch later
import "@johnlindquist/kit";

// TODO
// 1. Get current url
// 2. find the div with the class "watch-later-button"
// 3. click the button
// 4. Make sure it gets added to the correct playlist

await hide();
await wait(1000);
// The control key is used to remove the typed snippet, so we need to make sure
// it is up before pressing our key combo
await keyboard.releaseKey(Key.LeftControl);
await keyboard.pressKey(Key.LeftShift, Key.LeftSuper, Key.C);
await keyboard.releaseKey(Key.LeftShift, Key.LeftSuper, Key.C);
await wait(1000);
let URLString: string = await clipboard.readText();

const items = await scrapeSelector(
  URLString,
  // CSS Selector to target elements
  "yt-formatted-string.style-scope.ytd-menu-service-item-renderer",
  // [Optional] function to transform the elements, if omitted then `element.innerText` is returned
  (element) => ({
    title: element.innerText,
    link: element.href,
  }),
  // [Optional] options
  {
    headless: false,
    timeout: 60000,
  }
);

await dev(items);
await exit();
