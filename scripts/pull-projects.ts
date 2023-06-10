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
