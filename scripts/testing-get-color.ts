// Name: Eye Dropper - Get Color

import "@johnlindquist/kit";

await hide();
let value = await eyeDropper();
await copy(value.sRGBHex);

await exit();
