// Users/plutotom/.kenv/kenvs/plutotom/scripts/drop-over.ts
import "@johnlindquist/kit";
var fileInfos = await drop({
  placeholder: "placeholder"
});
await path({
  hint: `select a path`,
  startPath: fileInfos[0].path
});
