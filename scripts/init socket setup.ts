// Name: init socket setup

import "@johnlindquist/kit";
import * as http from "http";
const express = await npm("express");
const { Server }: typeof import("socket.io") = await npm("socket.io");
let clipboardListener = await npm("clipboard-event");
const { io: ioClient }: typeof import("socket.io-client") = await npm(
  "socket.io-client"
);

let flags = {
  scan: {
    name: "Scan for connections",
    shortcut: "cmd+o",
  },
};

enum ServerType {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

// let SERVER_TYPE: ServerType = await env(
//   "SOCKET_SERVER_TYPE",
//   async () =>
//     await arg({ placeholder: "select Type", flags }, [
//       ServerType.CLIENT,
//       ServerType.SERVER,
//     ])
// );

const startSocketServer = async (
  port1: Number,
  port2: Number,
  ip1: String,
  ip2: String
) => {
  // Inicating express server, socket.io server, and clipboard listener
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  clipboardListener.startListening();

  clipboardListener.on("change", async () => {
    // getClipboardHistory is a tool coming from kit, but it seems to not be working on windows.
    let [latest] = await getClipboardHistory();
    let text = await paste();

    // emmiting should send the latest clipboard to the client
    await io.emit("TO_WINDOWS", latest || text);
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  // starting listening client. This connects to computer two.
  const socketClient = await ioClient(
    `http://${PC_ADDRESS}:${SERVER_PORT}`,
    {}
  );
  await socketClient.on("MAC_EVENT", async (clipboardRes) => {
    // await dev(clipboardRes.text || clipboardRes.value);

    // await setClipboard(clipboardRes.value);
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
};

let choice = await arg({ placeholder: "What mode do you want?" }, [
  "Scan",
  "Server",
]);

if (flag?.scan) {
  await dev(
    `you have placed the server in scanning mode, this will scan the network for
     other servers`
  );
} else if (flag?.copy) {
  await dev("copying");
  // copy(url);
}

if (choice.includes("Scan")) {
  // list out all things found on ports 3000 - 3010 on network
} else if (choice.includes("Server")) {
  await startSocketServer(3001, 3002, "ip1", "ip2");
}
