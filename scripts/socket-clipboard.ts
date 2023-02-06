// Name: socket-clipboard

import "@johnlindquist/kit";
import * as http from "http";
const express = await npm("express");
const { Server }: typeof import("socket.io") = await npm("socket.io");
let clipboardListener = await npm("clipboard-event");
const { io: ioClient }: typeof import("socket.io-client") = await npm(
  "socket.io-client"
);

const MY_PORT = await env("MY_PORT", "My port the server should run on?");
const SERVER_PORT = await env(
  "SERVER_PORT",
  "What is the port of the server you need to link to?"
);
const SERVER_IP = await env(
  "SERVER_IP",
  "this is the ip of the other computer you want to connect to"
);

/*// todo, scan network for port range of 3000-30010 for other running servers, 
  then we can filter that list to only ones that are kit scripts.
  onces we do that we will have a pretty small list of servers to connect to.
  we can then list ou the servers and have the user select which one they 
  want to connect to.
  This can then be stored into a .env file and used to connect to the server.

  we should also store the desiered port in the .env file as well, but check every
  boot up if the port is avilable. If not then we can prompt of an avilable new port to use.
  
*/

// Inicating express server, socket.io server, and clipboard listener
const app = express();
const server = http.createServer(app);
const io = new Server(server);
clipboardListener.startListening();

clipboardListener.on("change", async () => {
  // getClipboardHistory is a tool coming from kit, but it seems to not be working on windows.
  // let latest = await clipboard.readText();
  let text = await paste();
  // emmiting should send the latest clipboard to the client
  await io.emit("TO_SERVER_EVENT", text);
});

io.on("connection", async (socket) => {
  console.log("a user connected");
  // await dev("a user connected");
  // await dev(socket);
});

// starting listening client. This connects to computer two.
const socketClient = await ioClient(`http://${SERVER_IP}:${SERVER_PORT}`, {});
await socketClient.on("TO_SERVER_EVENT", async (clipboardRes) => {
  // await dev(clipboardRes);
  await clipboard.writeText(clipboardRes);
  await kit.log("recieved clipboard from server", clipboardRes.value);
});

app.get("/testing", (req, res) => {
  res.send("Hello World!");
});

server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});

// hides script kit/
await hide();
