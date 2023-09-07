// Name: Color Picker - Get Color
// alias: pick
import "@johnlindquist/kit";

await hide();
let value = await eyeDropper();

await copy(value.sRGBHex);

await exit();
