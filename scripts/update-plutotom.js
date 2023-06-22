/*
# Update to the Latest plutotom scripts

- cd's to the examples directory
- pulls the latest examples from the script kit repo
- goes back to the main menu
*/

// Name:
// Description: Update to the Latest Script Kit Examples

import "@johnlindquist/kit";

let examplesDir = kenvPath("kenvs", "plutotom");
cd(examplesDir);

await $`git stash`;
await $`git pull`;

await mainScript();
