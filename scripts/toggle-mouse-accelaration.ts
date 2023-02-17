// Name: toggle mouse accelaration

import "@johnlindquist/kit";
// defaults write .GlobalPreferences com.apple.mouse.scaling -1 // this turns off mouse acceleration

// using apple scripts or the termenal, get the current mouse acceleration
let { stdout } = await $`defaults read -g com.apple.mouse.scaling`;

//cast stdout as a number
let baseMouseAcceleration = await env("MOUSE_ACCELERATION", async () => stdout);

//// If the mouse acceleration is on, then turn it off by setting it to -1
if ((await parseFloat(stdout)) > 0) {
  await $`defaults write -g com.apple.mouse.scaling -1`;
} else {
  // if the mouse accelaration is 0, set it to 1
  await $`defaults write -g com.apple.mouse.scaling ${baseMouseAcceleration}`;
}

// await dev(
//   await $`defaults read -g com.apple.mouse.scaling`.then((x) => x.stdout)
// );

notify(await $`defaults read -g com.apple.mouse.scaling`.then((x) => x.stdout));
