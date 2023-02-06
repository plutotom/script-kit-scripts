// ../../../../.kenv/kenvs/windows-scripts/scripts/socket-auto-connect.ts
import "@johnlindquist/kit";
import * as http from "http";
var IP = await npm("ip");
var xml2js = await npm("xml2js");
var parser = await new xml2js.Parser();
var localhostIp = await IP.address();
var potentialRunningServers = [
  {
    addrtype: "im an example",
    vendor: "idk",
    ip: "10.0.0.222",
    port: "3002"
  }
];
kit.setPanel(
  "socket-auto-connect: Scanning for running servers, searching between ports 3000-3010 and ips 10.0.0.200/24"
);
var res = await $`nmap -p  3000-3010 -sV -oX - 10.0.0.200/24 --open`;
var ProcessOutput = await res.stdout;
await console.log("here is a log thign");
await parser.parseString(res, async (err, result) => {
  let filtered = await result.nmaprun.host.filter((host) => {
    return host.ports[0].port[0].service[0].$.product.toLocaleLowerCase().includes("express");
  });
  await filtered.forEach((host) => {
    let ip = host.address[0].$.addr;
    let port = host.ports[0].port[0].$.portid;
    let addrtype = host.address[1].$.addrtype;
    let vendor = host.address[1].$.vendor;
    if (ip === localhostIp)
      return;
    console.log(`here is the new ip address`);
    console.log(`ip: ${ip} port: ${port}`);
    potentialRunningServers.push({ addrtype, vendor, ip, port });
  });
});
var express = await npm("express");
var detectPort = await npm("detect-port");
var { Server } = await npm("socket.io");
var clipboardListener = await npm("clipboard-event");
var { io: ioClient } = await npm(
  "socket.io-client"
);
var MY_PORT = await env("MY_PORT", "My port the server should run on?");
var SERVER_PORT = detectPort(3e3);
var SERVER_IP = await env("CONNECTED_SERVER_IP", async () => {
  return await arg(
    "Select your server ip address and port grouppings",
    potentialRunningServers.map((server2) => {
      return {
        name: `${server2.ip}:${server2.port}: ${server2.vendor}, ${server2.addrtype}`,
        description: `Server IP: ${server2.ip} Server Port: ${server2.port} Server Addrtype: ${server2.addrtype} Server Vendor: ${server2.vendor}`,
        value: `${server2.ip}:${server2.port}`
      };
    })
  );
});
var app = express();
var server = http.createServer(app);
var io = new Server(server);
clipboardListener.startListening();
clipboardListener.on("change", async () => {
  let text = await paste();
  await io.emit("TO_SERVER_EVENT", text);
});
io.on("connection", async (socket) => {
  console.log("a user connected");
});
var socketClient = await ioClient(`http://${SERVER_IP}`, {});
await socketClient.on("TO_SERVER_EVENT", async (clipboardRes) => {
  await clipboard.writeText(clipboardRes);
  await kit.log("recieved clipboard from server", clipboardRes.value);
});
app.get("/testing", (req, res2) => {
  res2.send("Hello World!");
});
server.listen(MY_PORT, () => {
  console.log(`listening on *:${MY_PORT}`);
});
