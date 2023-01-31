// Name: Drop Over
// Notes: this link seems to be how he is listing files in the file explorer https://github.com/johnlindquist/kit/blob/b34d258c4990cb33fbd8262187bee4e95b29fa86/src/lib/file.ts#L4

import "@johnlindquist/kit";

let fileInfos: [] | any = await drop({
  placeholder: "placeholder",
});

await path({
  hint: `select a path`,
  startPath: fileInfos[0].path,
});
