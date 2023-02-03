// ../../../../.kenv/kenvs/windows-scripts/scripts/place-holder-for-socket.ts
import "@johnlindquist/kit";
var detectPort = await npm("detect-port");
var SERVER_PORT = null;
var SERVER_TYPE = await env(
  "SOCKET_SERVER_TYPE",
  async () => await arg("select Type", ["CLIENT" /* CLIENT */, "SERVER" /* SERVER */])
);
if (SERVER_TYPE === "SERVER" /* SERVER */) {
  SERVER_PORT = await env("CLIPBOARD_SERVER_PORT", async () => {
    let posablePort = await arg("Is this port ok?", async () => {
      let posableOptions = [
        await detectPort(3e3),
        await detectPort(3e3 + 1),
        await detectPort(3e3 + 2)
      ];
      return posableOptions.map((port) => port.toString());
    });
    return posablePort;
  });
  await dev("Starting server");
} else if (SERVER_TYPE === "CLIENT" /* CLIENT */) {
  dev("Starting client");
} else {
  await env("SOCKET_SERVER_TYPE", { reset: true });
}
