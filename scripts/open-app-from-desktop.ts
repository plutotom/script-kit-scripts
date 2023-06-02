// Name: open app from desktop

import "@johnlindquist/kit";

let desktopPath = await env("DESKTOP_PATH", async () => {
  return selectFolder("Enter your Desktop Location");
});
// returns an array with all the files/folders names.
let desktopFolder = await readdir(desktopPath);
// desktopFolder.sort();

// sort out .ini files
desktopFolder.filter((el, i, arr) => {
  return !el.includes(".ini");
});

let selectedShortcut = await arg(
  "Pick a Shortcut",
  desktopFolder.map((folder) => ({
    name: folder,
    description: home(desktopPath, folder),
    value: home(desktopPath, folder),
  }))
);

// click selectedShortcut
await open(selectedShortcut);
