// .kenv/kenvs/plutotom/scripts/socket-clipboard.ts
import "@johnlindquist/kit";
import * as http from "http";
var express = await npm("express");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var SERVER_TYPE = await env(
  "SOCKET_SERVER_TYPE",
  async () => await arg("select Type", ["CLIENT" /* CLIENT */, "SERVER" /* SERVER */])
);
var MY_PORT = await env("MY_PORT", "My port the server should run on?");
var SERVER_PORT = await env(
  "SERVER_PORT",
  "What is the port of the server you need to link to?"
);
var PC_ADDRESS = await env("PC_IP");
if (SERVER_TYPE === "SERVER") {
  dev("Starting server");
} else if (SERVER_TYPE === "CLIENT") {
  dev("Starting client");
} else if (SERVER_TYPE === "CLIENT" /* CLIENT */) {
  dev("Starting client number 2");
  await env("SOCKET_SERVER_TYPE", "");
}
var app = express();
var server = http.createServer(app);
var io = new Server(server);
clipboardListener.startListening();
clipboardListener.on("change", async () => {
  let [latest] = await getClipboardHistory();
  let text = await paste();
  await io.emit("TO_WINDOWS", latest || text);
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
var socketClient = await ioClient(`http://${PC_ADDRESS}:${SERVER_PORT}`, {});
await socketClient.on("MAC_EVENT", async (clipboardRes) => {
  await kit.log("recieved clipboard from server", clipboardRes.value);
});
app.get("/testing", (req, res) => {
  res.send("Hello World!");
});
server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});
await hide();
