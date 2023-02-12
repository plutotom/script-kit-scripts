// Name: socket auto connect

import "@johnlindquist/kit";
let detectPort = await npm("detect-port");
const express: typeof import("express") = await npm("express");

const IP = await npm("ip");
const xml2js = await npm("xml2js");
const parser = await new xml2js.Parser();
const localhostIp = await IP.address();

let SERVER_PORT = null;
let potentialRunningServers = [
  {
    addrtype: "im an example",
    vendor: "idk",
    ip: "10.0.0.222",
    port: "3002",
  },
  {
    addrtype: "im an example2",
    vendor: "idkels",
    ip: "2332",
    port: "3002",
  },
];

let formatProcesses = async () => {
  let processes = await getProcesses();
  return processes
    .filter((p) => p?.scriptPath)
    .filter((p) => !p?.scriptPath?.endsWith("processes.js"))
    .map((p) => {
      return {
        name: p?.scriptPath,
        description: `${p.pid}`,
        value: p,
      };
    });
};

let isServerRunning = await arg(
  {
    placeholder: "Do you have a clipboard server already running?",
    // make a prview reuging html of the process
    preview: async () => {
      let processes = await formatProcesses();
      return await processes.map((p) => {
        // reutnr a list that has a line brake between each process and place the pid under the name. Use tailwind to style it.
        return `<div>
        <li class="text-gray-400">${p.name} <span class="text-yellow-600">${p.description}</span></li></div>`;
      });
    },
  },
  async () => {
    return [
      { text: "Yes", value: true },
      { text: "No", value: false },
    ].map((choice) => {
      return {
        name: choice.text,
        value: choice.value,
      };
    });
  }
);

/* we have to check if a server is running so that we are discoverable to another
 instance running on a different computer 
 */
if (!isServerRunning) {
  /* setting server port
  This port needs to not change other wise it would lose connection to the other pc.
  */
  SERVER_PORT = await env("CLIPBOARD_SERVER_PORT", async () => {
    let posablePort = await arg("Is this port ok?", async () => {
      let posableOptions = [
        await detectPort(3000),
        await detectPort(3000 + 1),
        await detectPort(3000 + 2),
      ];
      return posableOptions.map((port) => port.toString());
    });
    return posablePort;
  });

  // starting server so that this is discoverable to other computers
  let server = express();
  server.listen(SERVER_PORT, () => {
    console.log(`Starting server on port ${SERVER_PORT}`);
  });
}
// ############################################################################################################

// First arg is the name of the database, second arg is the default value
const potentialRunningServersDb = await db("potentialRunningServers", {
  data: potentialRunningServers,
});

interface potentialRunningServers {
  addrtype: string;
  vendor: string;
  ip: string;
  port: string;
}

const scanForOpenServers = async (): Promise<potentialRunningServers[]> => {
  let res = await $`nmap -p  3000-3010 -sV -oX - 10.0.0.200/24 --open`;

  // get the stdout of the process
  let ProcessOutput = await res.stdout;

  await console.log("here is a log thign");
  await parser.parseString(res, async (err, result) => {
    //   await inspect(result);

    // filter by the ports service product, it should include "node" or "express".
    let filtered = await result.nmaprun.host.filter((host) => {
      return host.ports[0].port[0].service[0].$.product
        .toLocaleLowerCase()
        .includes("express" || "node");
    });

    // log out the filtered ip addresses and port number that the service is running on that is not running on the localhost
    await filtered.forEach((host) => {
      let ip = host.address[0].$.addr;
      let port = host.ports[0].port[0].$.portid;
      let addrtype = host.address[1].$.addrtype;
      let vendor = host.address[1].$.vendor;

      if (ip === localhostIp) return;
      console.log(`here is the new ip address`);
      console.log(`ip: ${ip} port: ${port}`);
      potentialRunningServers.push({ addrtype, vendor, ip, port });
    });
    //   await dev({ potentialRunningServers: potentialRunningServers });
  });
  return potentialRunningServers;
};

while (true) {
  await arg({
    placeholder: "Select a server to connect to",
    choices: await potentialRunningServersDb.data?.data?.map((server) => {
      return `${server.addrtype} ${server.vendor} ${server.ip} ${server.port}`;
    }),
  });

  let testingRes = arg(
    "Select a server to connect to",
    await scanForOpenServers().then((res) => {
      return res.map((server) => {
        return `${server.addrtype} ${server.vendor} ${server.ip} ${server.port}`;
      });
    })
  );
}

potentialRunningServersDb.data = potentialRunningServers;
await potentialRunningServersDb.write();

// ########################################################################################################################

// // import * as http from "http";
// // const express = await npm("express");
// // const detectPort = await npm("detect-port");
// // const { Server }: typeof import("socket.io") = await npm("socket.io");
// // let clipboardListener = await npm("clipboard-event");

// // const { io: ioClient }: typeof import("socket.io-client") = await npm(
// //   "socket.io-client"
// // );

// // const MY_PORT = await env("MY_PORT", "My port the server should run on?");
// // const SERVER_PORT = detectPort(3000);

// // const SERVER_IP = await env("CONNECTED_SERVER_IP", async () => {
// //   return await arg(
// //     "Select your server ip address and port grouppings",
// //     potentialRunningServers.map((server) => {
// //       return {
// //         name: `${server.ip}:${server.port}: ${server.vendor}, ${server.addrtype}`,
// //         description: `Server IP: ${server.ip} Server Port: ${server.port} Server Addrtype: ${server.addrtype} Server Vendor: ${server.vendor}`,
// //         value: `${server.ip}:${server.port}`,
// //       };
// //     })
// //   );
// // });

// // /*// todo, scan network for port range of 3000-30010 for other running servers,
// //   then we can filter that list to only ones that are kit scripts.
// //   onces we do that we will have a pretty small list of servers to connect to.
// //   we can then list ou the servers and have the user select which one they
// //   want to connect to.
// //   This can then be stored into a .env file and used to connect to the server.

// //   we should also store the desiered port in the .env file as well, but check every
// //   boot up if the port is avilable. If not then we can prompt of an avilable new port to use.

// // */

// // // iniciating express server, socket.io server, and clipboard listener
// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server);
// // clipboardListener.startListening();

// // clipboardListener.on("change", async () => {
// //   // getClipboardHistory is a tool coming from kit, but it seems to not be working on windows.
// //   // let latest = await clipboard.readText();
// //   let text = await paste();
// //   // emmiting should send the latest clipboard to the client
// //   await io.emit("TO_SERVER_EVENT", text);
// // });

// // io.on("connection", async (socket) => {
// //   console.log("a user connected");
// //   // await dev("a user connected");
// //   // await dev(socket);
// // });

// // // starting listening client. This connects to computer two.
// // const socketClient = await ioClient(`http://${SERVER_IP}`, {});
// // await socketClient.on("TO_SERVER_EVENT", async (clipboardRes) => {
// //   // await dev(clipboardRes);
// //   await clipboard.writeText(clipboardRes);
// //   await kit.log("recieved clipboard from server", clipboardRes.value);
// // });

// // app.get("/testing", (req, res) => {
// //   res.send("Hello World!");
// // });

// // server.listen(MY_PORT, () => {
// //   console.log(`listening on *:${MY_PORT}`);
// // });
