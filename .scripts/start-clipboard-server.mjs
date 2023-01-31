// Users/plutotom/.kenv/kenvs/plutotom/scripts/start-clipboard-server.ts
import "@johnlindquist/kit";
var express = await npm("express");
var server = express();
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
open("http://localhost:3000/clipboard");
