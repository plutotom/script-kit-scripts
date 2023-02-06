// Name: evalscanExample

import "@johnlindquist/kit";

const Evilscan = await npm("evilscan");

const options = {
  // 192.168.0.0/24 --port=21-23,80
  target: "10.0.0/24",
  // target: "10.0.0.209",
  port: "3000-3010",
  status: "Open", // Timeout, Refused, Open, Unreachable
  banner: true,
  display: "json",
};

const evilscan = new Evilscan(options);

evilscan.on("result", async (data) => {
  // fired when item is matching options
  console.log(data);
});

evilscan.on("error", (err) => {
  throw new Error(err.toString());
});

evilscan.on("done", () => {
  // finished !
  console.log("Done");
});

evilscan.run();
