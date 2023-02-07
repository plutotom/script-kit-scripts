// Name: Open Coding Project
// Description: Open a coding project in a new terminal based on the folder name

import "@johnlindquist/kit";

// list all folders in ~/Documents/coding
// let codingFolder = await ls("~/Documents/coding");
let basePath = await env("CODING_FOLDER_LOCATION", async () => {
  // let basePath = await arg("Coding Folder Location?", async () => {
  //   let basePath = await ls("~/Documents/coding");
  //   return basePath;
  // });
  return selectFolder("Coding Folder Location?");
  // return readdir(basePath);
});

let codingFolder = await readdir(basePath);
//sort codingFolder alphabetically
codingFolder.sort();
// adds "Make New Folder" to the top of the list
codingFolder.unshift("Make New Folder");

let selectedFolder = await arg(
  "Pick a project",
  codingFolder.map((folder) => ({
    name: folder,
    description: home(basePath, folder),
    value: home(basePath, folder),
  }))
);
if (selectedFolder.includes("Make New Folder")) {
  let folderName = await arg("Folder Name?");

  // Give new prompt asking for folder name, on return create new folder, cd into it, and open termnal at it
  await $`mkdir ${basePath}${folderName}`;
  // await $`open -a Terminal ${basePath}${folderName}`;
  // await $`code ${basePath}${folderName}`;
  await edit(`${basePath}/${folderName}`);
} else {
  // await $`code ${selectedFolder}`;

  await edit(selectedFolder);
}

// await $`open -a Terminal ${selectedFolder}`;
