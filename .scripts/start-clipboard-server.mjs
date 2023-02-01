// Users/plutotom/.kenv/kenvs/plutotom/scripts/start-clipboard-server.ts
import "@johnlindquist/kit";
var express = await npm("express");
var ssid = await $`networksetup -getairportnetwork en0 | cut -d ' ' -f 4`;
var home_ssid = await env("HOME_SSID");
if (ssid._stdout.includes(home_ssid)) {
  let runningScripts = await kit.getProcesses();
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
    server.listen(3e3, () => {
      console.log(`Starting server on port ${EXPRESS_PORT | 3e3}`);
    });
    kit.log("Starting server on port 3000");
  }
}
