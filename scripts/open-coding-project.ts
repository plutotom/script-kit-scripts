// Name: Open Coding Project
// Description: Open a coding project in a new terminal based on the folder name
// alias: pro
import "@johnlindquist/kit";

// list all folders in ~/Documents/coding
let basePath = await env("CODING_FOLDER_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});

let codingFolder = await readdir(basePath);
//sort codingFolder alphabetically
codingFolder.sort();
// Adds "Make New Folder" to the top of the list
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
  // Give new prompt asking for folder name, on return create new folder, cd into it, and open terminal at it
  await $`mkdir ${basePath}/${folderName}`;
  await $`code ${basePath}/${folderName}`;
} else {
  await edit(selectedFolder);
}
