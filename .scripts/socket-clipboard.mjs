// Users/plutotom/.kenv/kenvs/plutotom/scripts/socket-clipboard.ts
import "@johnlindquist/kit";
import * as http from "http";
var express = await npm("express");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var app = express();
var server = http.createServer(app);
var io = new Server(server);
clipboardListener.startListening();
clipboardListener.on("change", async () => {
  let [latest] = await getClipboardHistory();
  io.emit("Updated Clipboard", latest);
});
io.on("connection", (socket) => {
});
var socketClient = await ioClient("http://localhost:3001", {});
socketClient.on("Updated Clipboard", (clipboardRes) => {
  dev(clipboardRes.value);
});
server.listen(3001, () => {
  console.log("listening on *:3001");
});
await hide();
