<<<<<<< HEAD
// .kenv/kenvs/plutotom/scripts/open-coding-project.ts
=======
// Users/proctoi/.kenv/kenvs/plutotom-mac/scripts/open-coding-project.ts
>>>>>>> 6aeb6b6bb4d0a771065948436589a2232eead69d
import "@johnlindquist/kit";
var basePath = await env("CODING_FOLDER_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});
var codingFolder = await readdir(basePath);
codingFolder.sort();
codingFolder.unshift("Make New Folder");
var selectedFolder = await arg(
  "Pick a project",
  codingFolder.map((folder) => ({
    name: folder,
    description: home(basePath, folder),
    value: home(basePath, folder)
  }))
);
if (selectedFolder.includes("Make New Folder")) {
  let folderName = await arg("Folder Name?");
  await $`mkdir ${basePath}/${folderName}`;
  await $`code ${basePath}/${folderName}`;
} else {
  await $`code ${selectedFolder}`;
}
