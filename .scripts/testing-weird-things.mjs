// .kenv/kenvs/windows-scripts/scripts/testing-weird-things.ts
import "@johnlindquist/kit";
var SERVER_TYPE = await env(
  "SOCKET_SERVER_TYPE",
  async () => await arg("select Type", ["CLIENT" /* CLIENT */, "SERVER" /* SERVER */])
);
await dev(SERVER_TYPE);
