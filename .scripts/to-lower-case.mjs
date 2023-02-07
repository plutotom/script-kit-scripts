// Users/plutotom/.kenv/kenvs/plutotom/scripts/to-lower-case.ts
import "@johnlindquist/kit";
var text = await getSelectedText();
await hide();
await setSelectedText(text.toLocaleLowerCase());
await exit();
