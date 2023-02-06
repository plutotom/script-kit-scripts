// .kenv/kenvs/windows-scripts/scripts/init socket setup.ts
import "@johnlindquist/kit";
import * as http from "http";
var express = await npm("express");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var startSocketServer = async (port1, port2, ip1, ip2) => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  clipboardListener.startListening();
  clipboardListener.on("change", async () => {
    let [latest] = await getClipboardHistory();
    let text = await paste();
    await io.emit("TO_WINDOWS", latest || text);
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
  const socketClient = await ioClient(
    `http://${PC_ADDRESS}:${SERVER_PORT}`,
    {}
  );
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
};
var choice = await arg({ placeholder: "What mode do you want?" }, [
  "Scan",
  "Server"
]);
if (flag?.scan) {
  await dev(
    `you have placed the server in scanning mode, this will scan the network for
     other servers`
  );
} else if (flag?.copy) {
  await dev("copying");
}
if (choice.includes("Scan")) {
} else if (choice.includes("Server")) {
  await startSocketServer(3001, 3002, "ip1", "ip2");
}
