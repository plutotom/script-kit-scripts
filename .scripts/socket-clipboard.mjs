// Users/plutotom/.kenv/kenvs/plutotom/scripts/socket-clipboard.ts
import "@johnlindquist/kit";
import * as http from "http";
var express = await npm("express");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm("socket.io-client");
var MY_PORT = await env("MY_PORT", "My port the server should run on?");
var SERVER_PORT = await env(
  "SERVER_PORT",
  "What is the port of the server you need to link to?"
);
var SERVER_IP = await env(
  "SERVER_IP",
  "this is the ip of the other computer you want to connect to"
);
var app = express();
var server = http.createServer(app);
var io = new Server(server);
clipboardListener.startListening();
clipboardListener.on("change", async () => {
  let [latest] = await getClipboardHistory();
  let text = await paste();
  await io.emit("TO_SERVER_EVENT", latest || text);
});
io.on("connection", async (socket) => {
  console.log("a user connected");
  await dev("a user connected");
  await dev(socket);
});
var socketClient = await ioClient(`http://${SERVER_IP}:${SERVER_PORT}`, {});
await socketClient.on("TO_SERVER_EVENT", async (clipboardRes) => {
  await dev(clipboardRes.text);
  await kit.log("recieved clipboard from server", clipboardRes.value);
});
app.get("/testing", (req, res) => {
  res.send("Hello World!");
});
server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});
await hide();
