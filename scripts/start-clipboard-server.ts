// Name: start clipboard server
// Description: Starts a express server that has open port for windows pc to make get request to get clipboard contents

import "@johnlindquist/kit";
const express: typeof import("express") = await npm("express");
const detectPort = await npm("detect-port");

const PORT = await detectPort(3000);

// gets the ssid of the current wifi network
// if it's home network ssid then start the server
const ssid = await $`networksetup -getairportnetwork en0 | cut -d ' ' -f 4`;
let home_ssid = await env("HOME_SSID");

if (ssid._stdout.includes(home_ssid)) {
  // checks to see if the server is already running.
  // getProcesses() returns an array of objects with the scriptPath.
  let runningScripts = await kit.getProcesses();
  //if the scriptPath includes the name of the script then it's running.
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

    server.listen(PORT, () => {
      console.log(`Starting server on port ${EXPRESS_PORT | PORT}`);
    });

    kit.log("Starting server on port PORT");
    // open("http://localhost:3000/clipboard");
  }
}

await hide();
