// Users/plutotom/.kenv/kenvs/plutotom/scripts/socket-client.ts
import "@johnlindquist/kit";
var express = await npm("express");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var socketClient = await ioClient("http://localhost:3001", {
  withCredentials: true
});
socketClient.on("Updated Clipboard", (socket) => {
  dev("Updated Clipboard at client");
});
await hide();
