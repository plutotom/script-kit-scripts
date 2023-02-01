// Name: start clipboard server
// Schedule: */1 * * * *
// Description: Starts a express server that has open port for windows pc to make get request to get clipboard contents

// 0 * * * *

import "@johnlindquist/kit";
const express: typeof import("express") = await npm("express");
// const express = await npm("express");

// gets the ssid of the current wifi network
// if it's home network ssid then start the server
const ssid = await $`networksetup -getairportnetwork en0 | cut -d ' ' -f 4`;
let home_ssid = await env("HOME_SSID");

if (ssid._stdout.includes(home_ssid)) {
  let runningScripts = await kit.getProcesses();
  // inspect(runningScripts);
  let sortedScripts = await runningScripts.filter((script) => {
    return script.scriptPath.includes("start-clipboard-server");
  });

  if (sortedScripts.length > 1) {
    widget("Clipboard Server Already running");
  } else {
    const server = express();
    server.get("/", async (req, res) => {
      res.send("Hello World!");
    });

    server.get("/clipboard", async (req, res) => {
      const text = await clipboard.readText();
      res.setHeader("Content-Type", "application/json");
      res.json({ text });
    });

    server.listen(3000, () => {
      console.log(`Starting server on port ${EXPRESS_PORT | 3000}`);
    });

    kit.log("Starting server on port 3000");
    // open("http://localhost:3000/clipboard");
  }
}
