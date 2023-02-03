// ../../../../.kenv/kenvs/windows-scripts/scripts/socket-clipboard.ts
import "@johnlindquist/kit";
import * as http from "http";
var express = await npm("express");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var MY_PORT = await env("MY_PORT", "My port the server should run on?");
var SERVER_PORT = await env(
  "SERVER_PORT",
  "What is the port of the server you need to link to?"
);
var MAC_ADDRESS = await env("MAC_IP");
var app = express();
var server = http.createServer(app);
var io = new Server(server);
clipboardListener.startListening();
clipboardListener.on("change", async () => {
  let [latest] = await getClipboardHistory();
  io.emit("Updated Clipboard", latest);
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
var socketClient = await ioClient(`http://${MAC_ADDRESS}:${SERVER_PORT}`, {});
socketClient.on("Updated Clipboard", (clipboardRes) => {
  kit.log("recieved clipboard from server", clipboardRes.value);
  console.log("recieved clipboard from server", clipboardRes.value);
});
server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});
await hide();
