// Name: Open Coding Project
// Description: Open a coding project in a new terminal based on the folder name

import "@johnlindquist/kit";

// list all folders in ~/Documents/coding
// let folders = await ls("~/Documents/coding");
let folders = await readdir(home("Documents/coding"));
//sort folders alphabetically
folders.sort();
// adds "Make New Folder" to the top of the list
folders.unshift("Make New Folder");

let selectedFolder = await arg(
  "Pick a project",
  folders.map((folder) => ({
    name: folder,
    description: home("coding", folder),
    value: home("Documents/coding", folder),
  }))
);

if (selectedFolder.includes("Make New Folder")) {
  let folderName = await arg("Folder Name?");

  // Give new prompt asking for folder name, on return create new folder, cd into it, and open termnal at it
  await $`mkdir ~/Documents/coding/${folderName}`;
  // await $`open -a Terminal ~/Documents/coding/${folderName}`;
  await $`code ~/Documents/coding/${folderName}`;
} else {
  await $`code ${selectedFolder}`;
  // await edit(selectedFolder);
}

// await $`open -a Terminal ${selectedFolder}`;
