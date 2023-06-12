// ../../Users/pluto/.kenv/kenvs/plutotom/scripts/open-coding-project.ts
import "@johnlindquist/kit";
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
        name: "control+o",
        bar: "right",
        onPress: async (input, state) => {
          let fullPath = state.focused.value;
          await exec(`explorer ${fullPath}`);
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
