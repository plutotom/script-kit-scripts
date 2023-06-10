// Users/plutotom/.kenv/kenvs/plutotom/scripts/open-coding-project.ts
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
  })),
  setShortcuts = [
    {
      name: "Stash",
      key: `${cmd}+s`,
      bar: "right",
      onPress: async () => {
        term.write(`git stash`);
      }
    },
    {
      name: "Merge",
      key: `${cmd}+m`,
      bar: "right",
      onPress: async () => {
        term.write(`git merge`);
      }
    },
    {
      name: "Exit",
      key: `${cmd}+w`,
      bar: "right",
      onPress: async () => {
        submit("");
      }
    }
  ]
);
if (selectedFolder.includes("Make New Folder")) {
  let folderName = await arg("Folder Name?");
  await $`mkdir ${basePath}/${folderName}`;
  await $`code ${basePath}/${folderName}`;
} else {
  await $`code ${selectedFolder}`;
}
