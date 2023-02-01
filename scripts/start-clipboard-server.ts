// Name: start clipboard server
// Description: Starts a express server that has open port for windows pc to make get request to get clipboard contents
// Schedule: 0 * * * *

import "@johnlindquist/kit";
const express: typeof import("express") = await npm("express");
// const express = await npm("express");

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

// open("http://localhost:3000/clipboard");
