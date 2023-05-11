// Name: pull projects
// alias: pull
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

await codingFolder.forEach(async (el, inx, arr) => {
  try {
    cd(basePath + "/" + el);
    await exec(`${basePath} + "/" + ${el}\n git stash`);
    await exec(`git pull`);
    await wait(500);
    // await getScripts(false);
    await mainScript();
  } catch (error) {
    await console.log(`Failed to pull ${basePath}"/"${el} \n ${error}`);
    await wait(1000);
  }
});
