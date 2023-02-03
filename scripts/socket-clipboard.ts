// Name: socket-clipboard

import "@johnlindquist/kit";
import * as http from "http";
const express = await npm("express");
const { Server }: typeof import("socket.io") = await npm("socket.io");
let clipboardListener = await npm("clipboard-event");
const { io: ioClient }: typeof import("socket.io-client") = await npm(
  "socket.io-client"
);
const MY_PORT = await env("My port the server should run on?");
const SERVER_PORT = await env(
  "What is the port of the server you need to link to?"
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
  let [latest] = await getClipboardHistory();
  // emmiting should send the latest clipboard to the client
  io.emit("Updated Clipboard", latest);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

// starting listening client. This connects to computer two.
const socketClient = await ioClient(`http://localhost:${SERVER_PORT}`, {});
socketClient.on("Updated Clipboard", (clipboardRes) => {
  kit.log("recieved clipboard from server", clipboardRes.value);
  console.log("recieved clipboard from server", clipboardRes.value);
});

server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});

// hides script kit/
await hide();
