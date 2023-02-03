// Name: place holder for socket

import "@johnlindquist/kit";
let detectPort = await npm("detect-port");
let SERVER_PORT = null;
enum ServerType {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

let SERVER_TYPE: ServerType = await env(
  "SOCKET_SERVER_TYPE",
  async () => await arg("select Type", [ServerType.CLIENT, ServerType.SERVER])
);

// If this is a server then we need to start the server, if it is the client then we need to scan the network for a posable running server, then ask the user which one they want to connect to.
if (SERVER_TYPE === ServerType.SERVER) {
  SERVER_PORT = await env("CLIPBOARD_SERVER_PORT", async () => {
    // let posablePort = await arg("is this port ok?", tempPort);
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
  // call start server function
  await dev("Starting server");
} else if (SERVER_TYPE === ServerType.CLIENT) {
  // scan for running servers on and ask user to select one
  // scan network for port range of 3000-30010 for other running servers,

  let selectedServer = await arg("Select server", async () => {
    let servers = ["server 1", "server 2", "server 3"];
    return servers.map((server) => server);
  });

  dev({ text: "you choise was", selectedServer });
} else {
  // reset env
  await env("SOCKET_SERVER_TYPE", { reset: true });
}
/*// todo, scan network for port range of 3000-30010 for other running servers, 
  then we can filter that list to only ones that are kit scripts.
  onces we do that we will have a pretty small list of servers to connect to.
  we can then list ou the servers and have the user select which one they 
  want to connect to.
  This can then be stored into a .env file and used to connect to the server.

  we should also store the desiered port in the .env file as well, but check every
  boot up if the port is avilable. If not then we can prompt of an avilable new port to use.
  
*/

// const MY_PORT = await env("MY_PORT", "My port the server should run on?");
// const SERVER_PORT = await env(
//   "SERVER_PORT",
//   "What is the port of the server you need to link to?"
// );
// const PC_ADDRESS = await env("PC_IP");
