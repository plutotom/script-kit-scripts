// .kenv/kenvs/windows-scripts/scripts/to-lower-case.ts
import "@johnlindquist/kit";
var text = await getSelectedText();
setSelectedText(text.toLocaleLowerCase());
