// Users/plutotom/.kenv/kenvs/plutotom/scripts/open-coding-termenalreturn.ts
import "@johnlindquist/kit";
var folders = await readdir(home("Documents/coding"));
folders.sort();
folders.unshift("Make New Folder");
var selectedFolder = await arg(
  "Pick a project",
  folders.map((folder) => ({
    name: folder,
    description: home("coding", folder),
    value: home("Documents/coding", folder)
  }))
);
if (selectedFolder.includes("Make New Folder")) {
  let folderName = await arg("Folder Name?");
  await $`mkdir ~/Documents/coding/${folderName}`;
  await $`code ~/Documents/coding/${folderName}`;
} else {
  await $`code ${selectedFolder}`;
}
