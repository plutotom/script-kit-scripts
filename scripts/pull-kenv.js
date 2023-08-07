// Name: update plutotom

import "@johnlindquist/kit";

let examplesDir = kenvPath("kenvs", "plutotom");
cd(examplesDir);

// await $`git stash`;
await $`git pull`;
// await $`git stash pop`;

await mainScript();
