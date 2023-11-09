// Name: Generate Raycast Scripts

import "@johnlindquist/kit";
const collect = await npm("collect.js");

// get the directory to store the scripts in. Save in an environment variable
const directory = await env("RAYCAST_SCRIPTS_DIRECTORY", async () => {
  return await selectFolder("Select a directory to store the scripts in");
});
// get all the scripts from Script Kit
let scripts = collect(await getScripts());
// remove preview from scripts
scripts = scripts.map((script) => {
  delete script.preview;
  return script;
});
// get only kenv scripts
scripts = scripts.where("kenv", "plutotom");
// TODO find out which scripts should be ignored
// generate a script for each one in the directory
scripts.each(async (script) => {
  const scriptContents = `#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title ${script.name}
# @raycast.mode silent
# @raycast.packageName Script Kit Scripts
# Documentation:
# @raycast.description ${script.description}


~/.kit/kar ${script.command}
`;
  await writeFile(`${directory}/${script.name}.sh`, scriptContents, "utf-8");
});
