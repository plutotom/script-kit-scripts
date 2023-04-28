// Name: start spectral-dashboard

import "@johnlindquist/kit";

// open term at project root
// Run git pull
// run npm i
// run npm run
// then open web browser to localhost:3000

let basePath = await env("CODING_FOLDER_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});

let is_dir: any = await isDir(basePath + "/dash-spectacle-dashboard");
if (!is_dir) {
  await dev("invalid spectacle location, exiting");
  await exit();
}
// await $`cd ${basePath}/dash-spectacle-dashboard`;

await term(`cd ${basePath}/dash-spectacle-dashboard`);

await term(`git pull`);
await term(`npm i`);
await term(`npm run xps-start`);

await wait(10000);
await keyboard.pressKey(Key.F11);
await wait(1000);
await exit();
