<<<<<<< HEAD
// ../../../../.kenv/kenvs/plutotom/scripts/open-coding-project.ts
=======
// Users/proctoi/.kenv/kenvs/plutotom-mac/scripts/open-coding-project.ts
>>>>>>> 7416bb5bde31b476b7d919f71738e14058dd8049
import "@johnlindquist/kit";
var cmd = isWin ? "ctrl" : "cmd";
var basePath = await env("CODING_FOLDER_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});
var codingFolder = await readdir(basePath);
codingFolder.sort();
codingFolder.unshift("Make New Folder");
var selectedFolder = await arg(
  {
    placeholder: "Kit Environment Actions",
    enter: "Select",
    shortcuts: [
      {
        key: `${cmd}+o`,
        name: isWin ? "Open in Explorer" : "Open in Finder",
        bar: "right",
        onPress: async (input, state) => {
          let fullPath = state.focused.value;
          isWin ? await exec(`explorer ${fullPath}`) : $`open ${fullPath}`;
        }
      },
      {
        key: `${cmd}+p`,
        name: "Git Pull",
        bar: "right",
        onPress: async (input, state) => {
          let fullPath = state.focused.value;
          isWin ? await term(`cd ${fullPath} && git pull`) : term(`cd ${fullPath} && git pull`);
        }
      }
    ]
  },
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
