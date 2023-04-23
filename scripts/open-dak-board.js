// Name: open Dak Board
// This is simply a shrotcut to open Dak Board in your default browser

import "@johnlindquist/kit";

const dakBoardUrl =
  "https://dakboard.com/app/screenPredefined?p=a1041ea239983d1d030246ec67ecfdce";

await browse(dakBoardUrl);

await wait(10000); // 10 seconds cuz laptop is slow
await keyboard.pressKey(Key.F11); // full screen
