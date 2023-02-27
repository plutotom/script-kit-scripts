// Name: toggle lights

import "@johnlindquist/kit";

const { Client }: typeof import("tplink-smarthome-api") = await npm(
  "tplink-smarthome-api"
);
// const { Client } = require("tplink-smarthome-api");

const client = new Client({
  defaultSendOptions: { timeout: 5000, transport: "tcp" },
});

// Look for devices, log to console, and turn them on
client.startDiscovery().on("device-new", (device) => {
  device.getSysInfo().then(console.log);
  if (String(device.relay_state) === "1") {
    device.setPowerState(false);
  }

  if (String(device.relay_state) === "0") {
    device.setPowerState(true);
  }
});
