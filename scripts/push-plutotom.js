// Name: push plutotom
// alias: push
import "@johnlindquist/kit";

let examplesDir = kenvPath("kenvs", "plutotom");
cd(examplesDir);

await $`git add .`;
await $`git commit -m "push plutotom"`;
await $`git push`;
// await $`git stash pop`;

await mainScript();
