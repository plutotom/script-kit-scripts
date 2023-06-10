// Name: Sync projects
// alias: Sync
import "@johnlindquist/kit";

// list all folders in ~/Documents/coding
let basePath = await env("CODING_FOLDER_LOCATION", async () => {
  return selectFolder("Coding Folder Location?");
});

let codingFolder = await readdir(basePath); // returns an array of folder/file names
// remove anything that starts with a '.'
codingFolder = codingFolder.filter((element) => {
  return element[0] !== ".";
});

const pullProject = async (basePath, path) => {
  try {
    log(`Path to project that will be pulled: ${basePath}\\${path}`);
  } catch (error) {
    log(error);
    // await log(`Failed to pull ${basePath}\\${path} \n ${error}`);
  }
};

await codingFolder.forEach(async (el, inx, arr) => {
  await pullProject(basePath, el);
});

// await wait(5000);
// await exit();

// Description: Git Pull Kenv Repo
import { getKenvs } from "../core/utils.js";
let kenvs = (await getKenvs()).map((value) => ({
  name: path.basename(value),
  value,
}));
kenvs.unshift({
  name: "main",
  value: kenvPath(),
});
let dir = await arg("Pull which kenv", kenvs);
cd(dir);
await term({
  command: `git fetch`,
  preview: md(`# Pulling a Kenv

> The terminal only ran "git fetch" to show you what changes are available.

You still need to run "get merge" to apply the changes.
  
  `),
  cwd: dir,
  shortcuts: [
    {
      name: "Stash",
      key: `${cmd}+s`,
      bar: "right",
      onPress: async () => {
        term.write(`git stash`);
      },
    },
    {
      name: "Merge",
      key: `${cmd}+m`,
      bar: "right",
      onPress: async () => {
        term.write(`git merge`);
      },
    },
    {
      name: "Exit",
      key: `${cmd}+w`,
      bar: "right",
      onPress: async () => {
        submit("");
      },
    },
  ],
});
await getScripts(false);
await mainScript();
//# sourceMappingURL=kenv-pull.js.map
