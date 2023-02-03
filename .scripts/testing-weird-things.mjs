// ../../../../.kenv/kenvs/windows-scripts/scripts/testing-weird-things.ts
import "@johnlindquist/kit";
var [latest] = await getClipboardHistory();
await dev(latest);
